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
	const newUser = await db
		.insert(schema.user)
		.values({
			id: nanoid(),
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

	return newUser[0];
}
