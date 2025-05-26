// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { eq } from 'drizzle-orm';
// import * as schema from '@db/schema';
// export const db = drizzle(process.env.DATABASE_URL!);
// export { schema };

// // import {
// // 	users
// // 	// user_profiles,
// // 	// projects,
// // 	// vendorProfiles,
// // 	// socialMedia,
// // 	// favoriteProjects,
// // 	// savedFilters,
// // 	// followedClients,
// // 	// wallets,
// // 	// financialTransactions,
// // 	// walletTransactions,
// // 	// financialStats
// // 	// } from './db/schema';
// // 	// } from '$db/schema';
// // } from '@db/schema';

// // import { users } from './db/schema';
// // OLD

// // Create a PostgreSQL connection pool
// // const pool = new Pool({
// // 	connectionString: process.env.DATABASE_URL
// // });

// // console.log(process.env.DATABASE_URL);

// // async function main() {
// // 	const user: typeof users.$inferInsert = {
// // 		id: 'u10000001cp',
// // 		username: 'JohnIsColl420',
// // 		passwordHash: '$2a$12$HFY5.rBoXtYxad4KsP.9V.KgkbubJEgMtfFznNnPXJblSZMKB5Vw.',
// // 		email: 'craft@example.com',
// // 		userType: 'vendor',
// // 		userRole: 'business',
// // 		dateJoined: '2024-12-10T08:30:00Z',
// // 		lastLogin: '2025-05-14T14:22:10Z',
// // 		isActive: true,
// // 		isOnline: true,
// // 		isEmailVerified: true,
// // 		isPhoneVerified: true,
// // 		location: 'Oslo, Norway',
// // 		locationData: [10.7522, 59.9139]
// // 	};

// // 	// CREATE USER
// // 	await db.insert(users).values(user);
// // 	console.log('New user created!');

// // 	// GET USER
// // 	const results = await db.select().from(users);
// // 	console.log('Getting all results from the database: ', results);
// // 	/*
// //   const results: {
// //     id: number;
// //     name: string;
// //     age: number;
// //     email: string;
// //   }[]
// //   */
// // 	// npx tsx src/lib/server/db/index.ts
// // 	// npx tsx index.ts
// // 	// cd src/lib/server/db

// // 	// UPDATING USER
// // 	await db
// // 		.update(users)
// // 		.set({
// // 			username: 'JohnIsColl69'
// // 		})
// // 		.where(eq(users.email, user.email));
// // 	console.log('User info updated!');

// // 	// DELETE USER
// // 	await db.delete(users).where(eq(users.email, user.email));
// // 	console.log('User deleted!');
// // }
// // main();
