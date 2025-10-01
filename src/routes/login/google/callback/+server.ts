// // routes/login/google/callback/+server.ts
// import { generateSessionToken, createSession, setSessionTokenCookie } from '@lib/server/session';
// import { google } from '$lib/server/oauth';
// import { decodeIdToken } from 'arctic';
// import { db } from '@db/index';
// import * as schema from '@db/schema';
// import { eq } from 'drizzle-orm';
// // import { createUser } from '@lib/server/user';
// import type { RequestEvent } from '@sveltejs/kit';
// import type { OAuth2Tokens } from 'arctic';
import { generateSessionToken, createSession, setSessionTokenCookie } from '@lib/server/session';
import { google } from '$lib/server/oauth';
import { decodeIdToken } from 'arctic';
import { db } from '@db/index';
import * as schema from '@db/schema';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';

async function getUserFromGoogleId(googleId: string) {
	const users = await db
		.select()
		.from(schema.user)
		.where(eq(schema.user.googleId, googleId))
		.limit(1);

	return users.length > 0 ? users[0] : null;
}

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		return new Response(null, {
			status: 400
		});
	}

	const accessToken = tokens.accessToken(); // <-- call the function

	const peopleRes = await fetch(
		'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,addresses,locations,locales,occupations,organizations,sipAddresses,skills,urls',
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	const peopleInfo = await peopleRes.json();
	console.log('Google People API info :', peopleInfo);

	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const userinfo = await userinfoRes.json();
	console.log('Google userinfo (ALL SCOPES):', userinfo);

	// console.log('Google OAuth scopes:', userinfoRes);
	console.log('Google OAuth scopes:', tokens.scopes());
	// if ('scope' in tokens) {
	// 	console.log('Google OAuth scopes:', tokens.scope);
	// } else if (tokens && typeof tokens === 'object') {
	// 	console.log('Google OAuth scopes (raw):', tokens);
	// } else {
	// 	console.log('No scopes returned from Google.');
	// }

	const claims = decodeIdToken(tokens.idToken()) as {
		sub: string;
		name: string;
		email: string;
		birthday: string;
	};

	console.log('Google ID token claims:', claims);

	const googleUserId = claims.sub;
	const username = claims.name;
	const email = claims.email;

	console.log('Extracted data:', { googleUserId, username, email });
	const existingUser = await getUserFromGoogleId(googleUserId);

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		console.log('Session created:', {
			sessionToken: sessionToken.substring(0, 10) + '...',
			userId: existingUser.id
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	// Store Google profile data in cookies/session for the registration page
	event.cookies.set(
		'google_profile',
		JSON.stringify({
			googleId: googleUserId,
			name: username,
			email: email
		}),
		{
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 10 // 10 minutes
		}
	);

	// Change line that redirects to complete registration:
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/register/complete-registration'
		}
	});
}
