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
import { db } from '@db/index';
// // const db = drizzle(process.env.DATABASE_URL!);
// import * as schema from '@db/schema';

// // console.log(process.env.DATABASE_URL);

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '$env/dynamic/private';
import * as schema from '@db/schema';

// export const db = drizzle(process.env.DATABASE_URL!);

import { users } from '@db/schema';

// src/lib/db/api.ts
// import { db } from './index';
import type { Table, InferInsertModel, InferSelectModel, SQL } from 'drizzle-orm';
import { eq, and, or } from 'drizzle-orm';

// // ALT 3) users from import
// const tableMap = {
// 	users: users
// };

// export async function createUserProfile(payload: any) {
// 	// const { tableName, dataInput } = payload;
// 	// // console.log('table:', tableName);
// 	// // console.log('dataInput:', dataInput);
// 	// // console.log('selectedTable:', 'morendin');

// 	// const tableKey = tableName as keyof typeof tableMap;
// 	// const selectedTable = tableMap[tableKey];
// 	// console.log('selectedTable:', tableKey);

// 	// const before = await db.select().from(tableMap[tableKey]);
// 	// console.log('1) before: ', before);

// 	// console.log('2) insert dataInput: ', dataInput);
// 	// // db.insert(tableMap[tableKey]).values(dataInput);
// 	db.insert(users).values({
// 		id: 'u10000001cp',
// 		username: 'JohnIsColl420',
// 		passwordHash: '$2a$12$HFY5...',
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
// 	});
// 	// // db.insert(schema.users).values(dataInput);
// 	// const after = await db.select().from(tableMap[tableKey]);
// 	// console.log('3) after: ', after);

// 	const all_users = await db.query.users.findMany();
// 	console.log('4) show all: ', all_users);
// }
// const dataInput = {
// 	id: 'u10000001cp',
// 	username: 'JohnIsColl420',
// 	passwordHash: '$2a$12$HFY5...',
// 	email: 'craft@example.com',
// 	userType: 'vendor',
// 	userRole: 'business',
// 	dateJoined: '2024-12-10T08:30:00Z',
// 	lastLogin: '2025-05-14T14:22:10Z',
// 	isActive: true,
// 	isOnline: true,
// 	isEmailVerified: true,
// 	isPhoneVerified: true,
// 	location: 'Oslo, Norway',
// 	locationData: [10.7522, 59.9139]
// };
// const payload = {
// 	tableName: 'users',
// 	dataInput: dataInput
// };
// await createUserProfile(payload);

// export async function GET() {
// 	const names = Object.keys(schema);
// 	const availableTables = names.map((name) => {
// 		// Process enum names by removing "StatusEnum" or "Enum" suffix
// 		let displayName = name;
// 		// if (displayName.endsWith('StatusEnum')) {
// 		// 	displayName = displayName.replace('StatusEnum', '');
// 		// } else if (displayName.endsWith('Enum')) {
// 		// 	displayName = displayName.replace('Enum', '');
// 		// }

// 		// Determine a user-friendly description
// 		let description;
// 		switch (name) {
// 			case 'users':
// 				description = 'User accounts';
// 				break;
// 			case 'user_profiles':
// 				description = 'User profile information';
// 				break;
// 			case 'sessions':
// 				description = 'User sessions';
// 				break;
// 			case 'projects':
// 				description = 'All projects';
// 				break;
// 			case 'vendorProfiles':
// 				description = 'Vendor profiles';
// 				break;
// 			case 'socialMedia':
// 				description = 'User social media links';
// 				break;
// 			case 'savedFilters':
// 				description = 'User saved search filters';
// 				break;
// 			case 'favoriteProjects':
// 				description = 'User favorite projects';
// 				break;
// 			case 'followedClients':
// 				description = 'User follow relationships';
// 				break;
// 			case 'wallets':
// 				description = 'User/vendor wallets';
// 				break;
// 			case 'financialTransactions':
// 				description = 'Financial transactions';
// 				break;
// 			case 'walletTransactions':
// 				description = 'Wallet transfers';
// 				break;
// 			case 'financialStats':
// 				description = 'User financial statistics';
// 				break;
// 			default:
// 				description = `${displayName} table`;
// 				break;
// 		}

// 		return { name: displayName, description };
// 	});
// 	console.log(availableTables);
// 	return json({
// 		success: true,
// 		message: 'Available tables for data population',
// 		tables: availableTables
// 	});
// }

// // export async function GET({ url }) {
// // 	const table = url.searchParams.get('table');

// // 	if (!table || !(table in tableMap)) {
// // 		return json({ error: 'Invalid or missing table name' }, { status: 400 });
// // 	}

// // 	try {
// // 		// @ts-ignore: Table type is inferred at runtime
// // 		const results = await db.select().from(tableMap[table]);
// // 		return json({ data: results });
// // 	} catch (err) {
// // 		console.error(err);
// // 		return json({ error: 'Failed to fetch data' }, { status: 500 });
// // 	}
// // }
// function getTableFromString(table) {
// 	return;
// }

// export async function POST({ request }) {
// 	const body = await request.json();
// 	// console.log('Received body:', body);
// 	// Extract table name and data from the payload
// 	const { payload } = body;
// 	const { table, dataInput } = payload;
// 	console.log('table: ', table);
// 	console.log('data: ', dataInput);

// 	// Check if the table name is valid
// 	if (!(table in tableMap)) {
// 		return json({ error: 'Invalid table name' }, { status: 400 });
// 	}

// 	// Ensure table is one of the keys in tableMap
// 	const tableName = table as keyof typeof tableMap;
// 	try {
// 		// Simply use tableMap to get the table reference and insert the data
// 		const selectedTable = tableMap[tableName];
// 		await db.insert(selectedTable).values(dataInput);
// 		console.log(`New record added to ${tableName}`);

// 		return json({
// 			success: true,
// 			message: `Data successfully inserted into ${tableName}`
// 		});
// 	} catch (err) {
// 		console.error('Insert error:', err);
// 		return json(
// 			{
// 				error: 'Insert failed',
// 				details: err instanceof Error ? err.message : String(err)
// 			},
// 			{ status: 500 }
// 		);
// 	}

// 	// try {
// 	// 	// Parse the request body
// 	// 	const body = await request.json();
// 	// 	console.log('Received body:', body);

// 	// 	// Extract table and data from the payload
// 	// 	const { payload } = body;
// 	// 	const { table, dataInput } = payload;

// 	// 	if (!(table in tableMap)) {
// 	// 		return json({ error: 'Invalid table name' }, { status: 400 });
// 	// 	}

// 	// 	// Insert the data into the database
// 	// 	// @ts-ignore: Table type is inferred at runtime
// 	// 	const results = await db.insert(tableMap[table]).values(dataInput);

// 	// 	return json({
// 	// 		success: true,
// 	// 		results: dataInput,
// 	// 		message: `Successfully added data to ${table}`
// 	// 	});
// 	// } catch (err) {
// 	// 	console.error('POST error:', err);
// 	// 	return json(
// 	// 		{
// 	// 			error: 'Insert failed',
// 	// 			details: err instanceof Error ? err.message : String(err)
// 	// 		},
// 	// 		{ status: 500 }
// 	// 	);
// 	// }
// }

// // export async function GET({ request }) {
// // 	const { table, data } = await request.json(); // todo seperate in function
// // 	if (!(table in tableMap)) {
// // 		return json({ error: 'Invalid table name' }, { status: 400 });
// // 	} // todo seperate in function

// // 	try {
// // 		// GET USERS
// // 		// const result = await db.select().from(tableName);
// // 		const result = await db.select().from(tableMap[table]);
// // 		return json({
// // 			success: true,
// // 			message: `${tableMap[table]} was retrieved`,
// // 			users
// // 		});
// // 	} catch (error) {
// // 		console.error('Error:', error);
// // 		return json(
// // 			{
// // 				success: false,
// // 				message: 'Failed to get ${tableName}',
// // 				error: error instanceof Error ? error.message : String(error)
// // 			},
// // 			{ status: 500 }
// // 		);
// // 	}
// // }
