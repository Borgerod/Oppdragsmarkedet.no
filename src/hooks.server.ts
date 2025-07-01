// import type { Handle } from '@sveltejs/kit';
// import { db } from '@db/index';
// import * as schema from '@db/schema';
// import { eq } from 'drizzle-orm';

// export const handle: Handle = async ({ event, resolve }) => {
// 	const sessionToken = event.cookies.get('session');

// 	if (sessionToken) {
// 		try {
// 			// Query user based on session token
// 			const user = await db
// 				.select()
// 				.from(schema.user)
// 				.where(eq(schema.user.sessionToken, sessionToken))
// 				.limit(1);

// 			if (user[0]) {
// 				event.locals.user = user[0];
// 			}
// 		} catch (error) {
// 			console.error('Error loading user:', error);
// 		}
// 	}

// 	return resolve(event);
// };
import { validateSessionToken } from '@lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session_token');

	console.log(
		'Hook - sessionToken:',
		sessionToken ? sessionToken.substring(0, 10) + '...' : 'none'
	);

	if (sessionToken) {
		const { session, user } = await validateSessionToken(sessionToken);
		console.log('Hook - validation result:', { session: !!session, user: !!user });
		if (session) {
			event.locals.session = session;
			event.locals.user = user;
		}
	}

	console.log('Hook - locals.user:', event.locals.user ? 'SET' : 'undefined');

	return resolve(event);
};
