// import { db } from '@db/index';
// import * as schema from '@db/schema';
// import { nanoid } from 'nanoid';

// export async function createUser(
// 	googleId: string,
// 	name: string,
// 	email: string,
// 	userType: string,
// 	userRole: string
// ) {
// 	const newUser = await db
// 		.insert(schema.user)
// 		.values({
// 			id: nanoid(),
// 			username: email.split('@')[0],
// 			passwordHash: '',
// 			email: email,
// 			userType: userType as 'vendor' | 'client' | 'employee' | 'admin',
// 			userRole: userRole as 'private' | 'business' | 'government' | 'employee' | 'admin',
// 			isThirdPartyVerified: true,
// 			emailVerified: new Date(),
// 			isEmailVerified: true,
// 			googleId: googleId,
// 			name: name
// 		})
// 		.returning();

// 	return newUser[0];
// }
import { db } from '@db/index';
import * as schema from '@db/schema';
import { nanoid } from 'nanoid';

export async function createUser(
	googleId: string,
	name: string,
	email: string,
	userType: string,
	userRole: string
) {
	const [firstName, ...rest] = name.split(' ');
	const lastName = rest.join(' ') || '';
	const userId = nanoid();

	const newUser = await db
		.insert(schema.user)
		.values({
			id: userId,
			username: email.split('@')[0],
			passwordHash: '',
			email: email,
			userType: userType as 'vendor' | 'client' | 'employee' | 'admin',
			userRole: userRole as 'private' | 'business' | 'government' | 'employee' | 'admin',
			isThirdPartyVerified: true,
			emailVerified: new Date(),
			isEmailVerified: true,
			googleId: googleId,
			name: name
		})
		.returning();

	// Insert into user_profiles
	await db.insert(schema.userProfiles).values({
		id: 'p' + userId, // or use your own id generator logic
		userId: userId,
		firstName: firstName,
		lastName: lastName,
		phone: '', // Google does not provide phone, leave blank or fill later
		email: email,
		birthDate: new Date('1970-01-01'), // Google does not provide, use placeholder or ask later
		profileImage: '', // Google profile image if available
		clientReviewsRating: 0,
		clientReviewsCount: 0,
		address: '',
		verifiedUser: true,
		verifiedPayment: false,
		choice: false,
		longTimeUser: false,
		fastReplyer: false,
		slowReplyer: false,
		givenComplaints: false,
		receivedComplaints: false,
		insurance: false,
		paymentInsurance: false,
		fastWorker: false,
		slowWorker: false
	});

	return newUser[0];
}
