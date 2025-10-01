// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ locals }) => {
// 	console.log('locals.user: ', locals.user);
// 	return {
// 		user: locals.user
// 	};
// };
import type { LayoutServerLoad } from './$types';
import { db } from '@db/index';
import { session, user } from '@db/schema';
import { eq } from 'drizzle-orm';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionToken = cookies.get('session_token');

	if (!sessionToken) {
		console.log('No session token found');
		return { user: null };
	}

	console.log('Found session token:', sessionToken.substring(0, 10) + '...');

	try {
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
		// console.log('Computed session ID:', sessionId.substring(0, 10) + '...');
		console.log('Computed session ID:', sessionId);
		// console.log('Full session token:', session);

		const result = await db
			.select({
				user: user,
				session: session
			})
			.from(session)
			.innerJoin(user, eq(session.userId, user.id))
			.where(eq(session.id, sessionId))
			.limit(1);

		console.log('Database query result:', result.length);

		if (result.length === 0) {
			console.log('No session found in database');
			return { user: null };
		}

		const { user: userData, session: sessionData } = result[0];

		// Check if session is expired
		if (Date.now() >= sessionData.expiresAt.getTime()) {
			console.log('Session expired');
			await db.delete(session).where(eq(session.id, sessionData.id));
			return { user: null };
		}

		console.log('User found:', userData.username);
		return { user: userData };
	} catch (error) {
		console.error('Error validating session:', error);
		return { user: null };
	}
};
