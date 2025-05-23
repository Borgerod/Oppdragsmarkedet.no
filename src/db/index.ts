// import type { PgTable } from 'drizzle-orm/pg-core';
// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { eq } from 'drizzle-orm';
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
// import 'dotenv/config';
// import { json } from '@sveltejs/kit';
// import { db } from '$lib/server/db/index';
// // const db = drizzle(process.env.DATABASE_URL!);
// import * as schema from '@db/schema';

// // console.log(process.env.DATABASE_URL);

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '$env/dynamic/private';
import * as schema from '@db/schema';

// export const db = drizzle(process.env.DATABASE_URL!);
export const db = drizzle(env.DATABASE_URL, {
	schema,
	logger: true
});
import { users } from '@db/schema';

// src/lib/db/api.ts
// import { db } from './index';
import type { Table, InferInsertModel, InferSelectModel, SQL } from 'drizzle-orm';
import { eq, and, or } from 'drizzle-orm';

// // ALT 3) users from import
// const tableMap = {
// 	users: users
// };

export async function createUserProfile(payload: any) {
	// const { tableName, dataInput } = payload;
	// // console.log('table:', tableName);
	// // console.log('dataInput:', dataInput);
	// // console.log('selectedTable:', 'morendin');

	// const tableKey = tableName as keyof typeof tableMap;
	// const selectedTable = tableMap[tableKey];
	// console.log('selectedTable:', tableKey);

	// const before = await db.select().from(tableMap[tableKey]);
	// console.log('1) before: ', before);

	// console.log('2) insert dataInput: ', dataInput);
	// // db.insert(tableMap[tableKey]).values(dataInput);
	db.insert(users).values({
		id: 'u10000001cp',
		username: 'JohnIsColl420',
		passwordHash: '$2a$12$HFY5...',
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
	});
	// // db.insert(schema.users).values(dataInput);
	// const after = await db.select().from(tableMap[tableKey]);
	// console.log('3) after: ', after);

	const all_users = await db.query.users.findMany();
	console.log('4) show all: ', all_users);
}
const dataInput = {
	id: 'u10000001cp',
	username: 'JohnIsColl420',
	passwordHash: '$2a$12$HFY5...',
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
const payload = {
	tableName: 'users',
	dataInput: dataInput
};
await createUserProfile(payload);

// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { eq } from 'drizzle-orm';
// import {
// 	users
// 	// user_profiles,
// 	// projects,
// 	// vendorProfiles,
// 	// socialMedia,
// 	// favoriteProjects,
// 	// savedFilters,
// 	// followedClients,
// 	// wallets,
// 	// financialTransactions,
// 	// walletTransactions,
// 	// financialStats
// } from '@db/schema';
// import { users } from './db/schema';
// OLD

// (property) users: RelationalQueryBuilder<ExtractTablesWithRelations<typeof schema>, {
//     tsName: "users";
//     dbName: "users";
//     columns: {
//         id: PgColumn<{
//             name: "id";
//             tableName: "users";
//             dataType: "string";
//             columnType: "PgText";
//             data: string;
//             driverParam: string;
//             notNull: true;
//             hasDefault: false;
//             isPrimaryKey: true;
//             isAutoincrement: false;
//             hasRuntimeDefault: false;
//             enumValues: [string, ...string[]];
//             baseColumn: never;
//             identity: undefined;
//             generated: undefined;
//         }, {}, {}>;
//         username: PgColumn<{
//             name: "username";
//             tableName: "users";
//             dataType: "string";
//             columnType: "PgVarchar";
//             data: string;
//             driverParam: string;
//             ... 8 more ...;
//             generated: undefined;
//         }, {}, {
//             ...;
//         }>;
//         ... 11 more ...;
//         locationData: PgColumn<...>;
//     };
//     relations: never;
//     primaryKey: AnyColumn[];
// }>

// console.log(process.env.DATABASE_URL);

// Create a PostgreSQL connection pool
// const pool = new Pool({
// 	connectionString: process.env.DATABASE_URL
// });

// async function main() {
// 	const user: typeof users.$inferInsert = {
// 		id: 'u10000001cp',
// 		username: 'JohnIsColl420',
// 		passwordHash: '$2a$12$HFY5.rBoXtYxad4KsP.9V.KgkbubJEgMtfFznNnPXJblSZMKB5Vw.',
// 		email: 'craft@example.com',
// 		userType: 'vendor',
// 		userRole: 'business',
// 		dateJoined: '2024-12-10T08:30:00Z',
// 		lastLogin: '2025-05-14T14:22:10Z',
// 		isActive: true,
// 		isOnline: true,
// 		isEmailVerified: true,
// 		isPhoneVerified: true,
// 		location: 'Oslo, Norway',
// 		locationData: [10.7522, 59.9139]
// 	};

// 	// CREATE USER
// 	await db.insert(users).values(user);
// 	console.log('New user created!');

// 	// GET USER
// 	const results = await db.select().from(users);
// 	console.log('Getting all results from the database: ', results);
// 	/*
//   const results: {
// 	id: number;
// 	name: string;
// 	age: number;
// 	email: string;
//   }[]
//   */
// 	// npx tsx src/lib/server/db/index.ts
// 	// npx tsx index.ts
// 	// cd src/lib/server/db

// 	// UPDATING USER
// 	await db
// 		.update(users)
// 		.set({
// 			username: 'JohnIsColl69'
// 		})
// 		.where(eq(users.email, user.email));
// 	console.log('User info updated!');

// 	// DELETE USER
// 	await db.delete(users).where(eq(users.email, user.email));
// 	console.log('User deleted!');
// }
// main();
