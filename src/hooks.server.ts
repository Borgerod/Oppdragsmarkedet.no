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
import type { Handle } from '@sveltejs/kit';
import { validateSessionToken } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session_token');

	if (sessionToken) {
		const { session, user } = await validateSessionToken(sessionToken);
		if (session && user) {
			event.locals.user = user;
			event.locals.session = session;
		}
	}

	return resolve(event);
};
