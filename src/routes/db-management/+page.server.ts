import { db } from '@db/index';
import * as schema from '@db/schema';
import { eq, isNull } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail as kitFail } from '@sveltejs/kit';
import { supabaseAuthAdminRole } from 'drizzle-orm/supabase';

export const load = (async () => {
	const users = await db.select().from(schema.users);
	const userProfiles = await db.select().from(schema.userProfiles);
	return {
		users,
		userProfiles
	};
}) satisfies PageServerLoad;

function fail(status: number, data: Record<string, any>): ReturnType<typeof kitFail> {
	return kitFail(status, data);
}

type NewUser = typeof schema.users.$inferInsert;

const insertUser = async (user: NewUser) => {
	return db.insert(schema.users).values(user);
};

type NewUserProfile = typeof schema.userProfiles.$inferInsert;

const insertUserProfile = async (userProfile: NewUserProfile) => {
	return db.insert(schema.userProfiles).values(userProfile);
};

export const actions = {
	createUsers: async ({ request }) => {
		const formData = await request.formData();
		const formJson = formData.get('form')?.toString();
		let roleKey = 1;
		let typeKey = 1;
		let idChar = 'u';
		try {
			// Parse the JSON string from the form
			// const parsedJson = JSON.parse(formJson); //!OLD
			const parsedJson = formJson
				? // creates mock data if json is empty
					JSON.parse(formJson)
				: [
						{
							// id: `u${roleKey}${Math.floor(Math.random() * 99999999999)}`,
							id: `${idChar}${Math.floor(Math.random() * 99999999999)}`,
							username: `MockUser${Math.floor(Math.random() * 1000)}`,
							passwordHash: '$2a$12$mockhash',
							email: `MockUser${Math.floor(Math.random() * 1000)}@example.com`,
							...(function () {
								// First determine userRole from the full list of options
								const userRole = ['private', 'business', 'government', 'employee', 'admin'][
									Math.floor(Math.random() * 5) // Use all 5 options
								];

								// Set idChar based on userRole
								if (userRole === 'admin') {
									idChar = 'a';
								} else if (userRole === 'employee') {
									idChar = 'e';
								}

								// Determine userType based on the rules
								let userType;
								if (userRole === 'admin') {
									userType = 'admin';
								} else if (userRole === 'employee') {
									userType = 'employee';
								} else if (userRole === 'business') {
									// Business can be vendor+client or just client
									const isVendor = Math.random() > 0.5; // 50% chance to be a vendor
									userType = isVendor ? ['vendor', 'client'] : 'client';
								} else {
									// For private and government
									userType = 'client';
								}

								return { userRole, userType };
							})(),
							// ...(function () {
							// 	const userRole = ['private', 'business', 'government', 'employee', 'admin'][
							// 		Math.floor(Math.random() * 3)
							// 	];
							// 	const userType =
							// 		userRole === 'business'
							// 			? ['vendor', 'client',][Math.floor(Math.random() * 2)]
							// 			: 'client';
							// 	return { userRole, userType };
							// })(),
							dateJoined: new Date().toISOString(),
							lastLogin: new Date().toISOString(),
							isActive: true,
							isOnline: Math.random() > 0.5,
							isEmailVerified: Math.random() > 0.5,
							isPhoneVerified: Math.random() > 0.5,
							location: 'MOCK DATA, MOCK DATA',
							locationData: [10.7522, 59.9139]
						}
					];

			const dataArray = Array.isArray(parsedJson) ? parsedJson : [parsedJson];

			const cleanedData = dataArray.map((RawData) => ({
				id: RawData.id,
				username: RawData.username,
				passwordHash: RawData.passwordHash,
				email: RawData.email,
				userType: RawData.userType,
				userRole: RawData.userRole,
				dateJoined: new Date(RawData.dateJoined).toISOString(),
				lastLogin: new Date(RawData.lastLogin).toISOString(),
				isActive: Boolean(RawData.isActive),
				isOnline: Boolean(RawData.isOnline),
				isEmailVerified: Boolean(RawData.isEmailVerified),
				isPhoneVerified: Boolean(RawData.isPhoneVerified),
				location: RawData.location,
				locationData: Array.isArray(RawData.locationData)
					? RawData.locationData.map(Number)
					: [0, 0]
			}));

			const insertedData = await db.transaction(async (tx) => {
				const results = [];
				for (const data of cleanedData) {
					const inserted = await tx.insert(schema.users).values(data).returning();
					results.push(inserted[0]);
				}
				console.log('Results', cleanedData);
				return results;
			});
		} catch (error) {
			console.error('Error processing form:', error);
			return fail(500, {
				message: 'Failed to process form data',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	},

	createUserProfile: async ({ request }) => {
		const formData = await request.formData();
		const formJson = formData.get('form')?.toString();
		// if (!formJson) {
		// 	return fail(400, { message: 'Form data is required' });
		// }

		try {
			// Parse the JSON string from the form
			// const parsedJson = JSON.parse(formJson); //! OLD

			// Get valid userIds that don't already have profiles
			const existingUsers = await db
				.select({ id: schema.users.id })
				.from(schema.users)
				.leftJoin(schema.userProfiles, eq(schema.users.id, schema.userProfiles.userId))
				.where(isNull(schema.userProfiles.userId))
				.limit(10);

			const randomUserId =
				existingUsers.length > 0
					? existingUsers[Math.floor(Math.random() * existingUsers.length)].id
					: `u${Math.floor(Math.random() * 99999999999)}`; // Fallback
			const generatedIDfromUserID = 'p' + randomUserId.substring(1);
			const parsedJson = formJson
				? JSON.parse(formJson)
				: [
						{
							id: generatedIDfromUserID,
							userId: randomUserId,
							firstName: `FirstName${Math.floor(Math.random() * 100)}`,
							lastName: `LastName${Math.floor(Math.random() * 100)}`,
							phone: `+47${Math.floor(Math.random() * 10000000) + 10000000}`,
							birthDate: new Date(
								1980 + Math.floor(Math.random() * 30),
								Math.floor(Math.random() * 12),
								Math.floor(Math.random() * 28) + 1
							).toISOString(),
							profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
							clientReviewsRating: (3 + Math.random() * 2).toFixed(1),
							clientReviewsCount: Math.floor(Math.random() * 100),
							verifiedUser: Math.random() > 0.3,
							verifiedPayment: Math.random() > 0.4,
							choice: Math.random() > 0.8,
							longTimeUser: Math.random() > 0.6,
							fastReplyer: Math.random() > 0.5,
							slowReplyer: Math.random() > 0.8,
							givenComplaints: Math.random() > 0.9,
							receivedComplaints: Math.random() > 0.9,
							insurance: Math.random() > 0.5,
							paymentInsurance: Math.random() > 0.6,
							fastWorker: Math.random() > 0.5,
							slowWorker: Math.random() > 0.8
						}
					];

			const dataArray = Array.isArray(parsedJson) ? parsedJson : [parsedJson];

			const cleanedData = dataArray.map((RawData) => ({
				id: RawData.id,
				userId: RawData.userId,
				firstName: RawData.firstName,
				lastName: RawData.lastName,
				phone: RawData.phone,
				birthDate: new Date(RawData.birthDate).toISOString(),
				profileImage: RawData.profileImage,
				clientReviewsRating: Number(RawData.clientReviewsRating),
				clientReviewsCount: Number(RawData.clientReviewsCount),
				verifiedUser: Boolean(RawData.verifiedUser),
				verifiedPayment: Boolean(RawData.verifiedPayment),
				choice: Boolean(RawData.choice),
				longTimeUser: Boolean(RawData.longTimeUser),
				fastReplyer: Boolean(RawData.fastReplyer),
				slowReplyer: Boolean(RawData.slowReplyer),
				givenComplaints: Boolean(RawData.givenComplaints),
				receivedComplaints: Boolean(RawData.receivedComplaints),
				insurance: Boolean(RawData.insurance),
				paymentInsurance: Boolean(RawData.paymentInsurance),
				fastWorker: Boolean(RawData.fastWorker),
				slowWorker: Boolean(RawData.slowWorker)
			}));

			const insertedData = await db.transaction(async (tx) => {
				const results = [];
				for (const data of cleanedData) {
					const inserted = await tx.insert(schema.userProfiles).values(data).returning();
					results.push(inserted[0]);
					console.log('Results:', cleanedData);
					// console.log('success. data was pushed: ', data);
				}
				return results;
			});
		} catch (error) {
			console.error('Error processing form:', error);
			return fail(500, {
				message: 'Failed to process form data',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}
} satisfies Actions;
