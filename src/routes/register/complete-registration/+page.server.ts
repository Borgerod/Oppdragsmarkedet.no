import { fail, redirect } from '@sveltejs/kit';
import { generateSessionToken, createSession, setSessionTokenCookie } from '@lib/server/session';
import { createUser } from '@lib/server/user';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const googleProfile = cookies.get('google_profile');

	if (googleProfile) {
		const profile = JSON.parse(googleProfile);
		return {
			profile: {
				email: profile.email,
				name: profile.name,
				googleId: profile.googleId
			}
		};
	}

	throw redirect(302, '/login');
};

export const actions: Actions = {
	default: async (requestEvent) => {
		const { request, cookies } = requestEvent;
		const data = await request.formData();
		const userType = data.get('userType') as string;
		const userRole = data.get('userRole') as string;

		const googleProfileCookie = cookies.get('google_profile');
		if (!googleProfileCookie) {
			return fail(400, { message: 'Registration session expired' });
		}

		const googleProfile = JSON.parse(googleProfileCookie);

		try {
			const newUser = await createUser(
				googleProfile.googleId,
				googleProfile.name,
				googleProfile.email,
				userType,
				userRole
			);

			cookies.delete('google_profile', { path: '/' });

			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, newUser.id);
			setSessionTokenCookie(requestEvent, sessionToken, session.expiresAt);
		} catch (error) {
			return fail(500, { message: 'Failed to create account' });
		}

		throw redirect(302, '/');
	}
};
