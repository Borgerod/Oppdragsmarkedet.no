import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import {
	user
	// user_profiles,
	// projects,
	// vendorProfiles,
	// socialMedia,
	// favoriteProjects,
	// savedFilters,
	// followedClients,
	// wallets,
	// financialTransactions,
	// walletTransactions,
	// financialStats
} from './db/schema';
import 'dotenv/config';
import { json } from '@sveltejs/kit';

const db = drizzle(process.env.DATABASE_URL!);

// console.log(process.env.DATABASE_URL);

async function main() {
	const user: typeof user.$inferInsert = {
		id: 'u10000001cp',
		username: 'JohnIsColl420',
		passwordHash: '$2a$12$HFY5.rBoXtYxad4KsP.9V.KgkbubJEgMtfFznNnPXJblSZMKB5Vw.',
		email: 'craft@example.com',
		userType: 'vendor',
		userRole: 'business',
		dateJoined: '2024-12-10T08:30:00Z',
		lastLogin: '2025-05-14T14:22:10Z',
		isActive: true,
		isOnline: true,
		isEmailVerified: true,
		isPhoneVerified: true,
		location: 'Oslo, Norway',
		locationData: [10.7522, 59.9139]
	};

	// CREATE USER
	await db.insert(user).values(user);
	// console.log('New user created.');

	// GET USER
	const results = await db.select().from(user);
	// console.log('Getting all results from the database: ', results);
	/*
  const user: {
	id: number;
	name: string;
	age: number;
	email: string;
  }[]
  */

	// UPDATING USER
	await db
		.update(user)
		.set({
			username: 'JohnIsColl69'
		})
		.where(eq(user.id, user.id));
	// console.log('User info updated.');

	// DELETE USER
	await db.delete(user).where(eq(user.id, user.id));
	// console.log('User deleted.');
}
main();

import type { PgTable } from 'drizzle-orm/pg-core';

export async function GET(tableName: PgTable<any>) {
	try {
		// GET USERS
		const result = await db.select().from(tableName);

		return json({
			success: true,
			message: `${tableName} was retrieved`,
			user
		});
	} catch (error) {
		console.error('Error:', error);
		return json(
			{
				success: false,
				message: 'Failed to get ${tableName}',
				error: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
}
