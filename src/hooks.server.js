import * as auth from '$lib/server/auth.js';
import { handle as authHandle } from '$lib/server/oauth.js';
import { sequence } from '@sveltejs/kit/hooks';

const handleAuth = async ({ event, resolve }) => {
	// First check for Auth.js session
	const authSession = await event.locals.auth();
	console.log('[hooks.server.js] Auth.js session:', authSession);

	if (authSession?.user) {
		// User is logged in via Auth.js
		event.locals.user = authSession.user;
		event.locals.session = authSession;
		event.locals.email = authSession.user.email;
		event.locals.name = authSession.user.name;
		event.locals.image = authSession.user.image;

		console.log('🔐 USER LOGIN INFO:');
		console.log('📧 Email:', authSession.user.email);
		console.log('👤 Name:', authSession.user.name);
		console.log('🖼️ Image:', authSession.user.image);
		console.log('🆔 ID:', authSession.user.id);
		console.log('🏷️ User Type:', authSession.user.userType);
		console.log('👔 User Role:', authSession.user.userRole);
		console.log('✅ Email Verified:', authSession.user.emailVerified);
		console.log('[hooks.server.js] Locals with Auth.js session:', event.locals);

		// Check if user has completed registration
		if (authSession.user.userType && authSession.user.userRole) {
			// User has completed registration
			return resolve(event);
		} else {
			// User exists but hasn't completed registration
			// If they're not on the registration page, redirect them
			if (!event.url.pathname.includes('/auth/complete-registration')) {
				return new Response(null, {
					status: 302,
					headers: { location: '/auth/complete-registration' }
				});
			}
		}

		return resolve(event);
	}

	// No Auth.js session, check for custom session
	console.log('[hooks.server.js] No Auth.js session found. Locals:', event.locals);
	event.locals.user = null;
	event.locals.session = null;
	event.locals.email = null;
	event.locals.name = null;
	event.locals.image = null;

	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle = sequence(authHandle, handleAuth);
