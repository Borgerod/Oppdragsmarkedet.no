import { db } from '@db/index';
import * as schema from '@db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// const userID = params.id; //* or your hardcoded ID
	const userID = 'u10000001cp'; // placeholder
	try {
		const userProfileData = {
			id: 'p20000003cp',
			userId: 'u10000001cp',
			firstName: 'Erik',
			lastName: 'Olsen',
			phone: '+4745678901',
			birthDate: '1978-11-03',
			profileImage: 'https://randomuser.me/api/portraits/men/54.jpg',
			clientReviewsRating: 5,
			clientReviewsCount: 15,
			verifiedUser: true,
			verifiedPayment: true,
			choice: true,
			longTimeUser: true,
			fastReplyer: true,
			slowReplyer: false,
			givenComplaints: false,
			receivedComplaints: false,
			insurance: false,
			paymentInsurance: true,
			fastWorker: true,
			slowWorker: false
		};
		await db.insert(schema.userProfiles).values(userProfileData).execute(); // Just execute without returning
		const result = await db.select().from(schema.userProfiles);
		console.log('profile data: ', result);

		const profile = await db
			.select()
			.from(schema.userProfiles)
			.where(eq(schema.userProfiles.userId, userID))
			.limit(1);

		console.log('profile data: ', profile);

		if (!profile) {
			return { status: 404, error: new Error('Profile not found') };
		}

		return {
			profile
		};
	} catch (error) {
		return { status: 500, error: new Error('Failed to fetch profile') };
	}
}) satisfies PageServerLoad;
