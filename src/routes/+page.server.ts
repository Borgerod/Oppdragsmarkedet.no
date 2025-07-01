import { fail, redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie } from '$lib/server/session';
import { db } from '@db/index';
import { session } from '@db/schema';
import { eq } from 'drizzle-orm';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { Actions, RequestEvent } from './$types';

export async function load(event: RequestEvent) {
	if (event.locals.session === null || event.locals.user === null) {
		return redirect(302, '/login');
	}
	return {
		user: event.locals.user
	};
}

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const sessionToken = event.cookies.get('session_token');

		if (!sessionToken) {
			return fail(401);
		}

		// Hash the token to get session ID and delete from database
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
		await db.delete(session).where(eq(session.id, sessionId));

		deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	}
};
