import { redirect } from '@sveltejs/kit';
import { signOut } from '$lib/server/oauth.js';
import * as auth from '$lib/server/auth.js';

export const actions = {
	default: async (event) => {
		console.log('[signout] Starting logout process');

		// Get session token from cookies and clear custom session
		const sessionToken = event.cookies.get(auth.sessionCookieName);
		if (sessionToken) {
			console.log('[signout] Found session token, clearing session');
			const { session } = await auth.validateSessionToken(sessionToken);
			if (session) {
				await auth.invalidateSession(session.id);
				console.log('[signout] Invalidated session:', session.id);
			}
			auth.deleteSessionTokenCookie(event);
		}

		// Clear all Auth.js cookies manually
		const authCookieNames = [
			'authjs.session-token',
			'authjs.csrf-token',
			'authjs.callback-url',
			'authjs.pkce.code_verifier',
			'__Secure-authjs.session-token',
			'__Secure-authjs.csrf-token',
			'__Host-authjs.csrf-token'
		];

		authCookieNames.forEach((cookieName) => {
			event.cookies.delete(cookieName, { path: '/' });
			event.cookies.delete(cookieName, { path: '/', secure: true });
			event.cookies.delete(cookieName, { path: '/', httpOnly: true });
		});

		console.log('[signout] Cleared Auth.js cookies');

		// Also call Auth.js signOut to clear OAuth session
		try {
			await signOut(event);
			console.log('[signout] Called Auth.js signOut');
		} catch (error) {
			console.log('[signout] Auth.js signOut error:', error);
		}

		console.log('[signout] Logout complete, redirecting');
		redirect(302, '/');
	}
};
