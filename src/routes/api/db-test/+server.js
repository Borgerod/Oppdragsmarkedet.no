// now do the same for all the tables,
// active_projects, completed projects, favorite_projects,
// financial_stats, financial_transactions, following, saved_filters,
// social_links, spatial_ref_sys, users, vendors, wallet_transactions, wallets.

import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

export async function GET() {
	try {
		// Test raw database connection to list tables
		const client = postgres(env.DATABASE_URL);

		// Log connection info and get table list
		console.log('Database connection test:');

		// Query to list all tables in the database
		const tables = await client`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;

		console.log(
			'Tables in database:',
			tables.map((t) => t.table_name)
		);

		// Try to query each possible table name variation
		let users = [];
		let tableFound = '';

		try {
			users = await db.select().from(table.user);
			tableFound = 'user';
		} catch (userError) {
			console.log('Failed to query "user" table:', userError.message);

			try {
				const result = await client`SELECT * FROM "users"`;
				users = result;
				tableFound = 'users';
			} catch (usersError) {
				console.log('Failed to query "users" table:', usersError.message);
			}
		}

		console.log('Users found:', users.length);
		console.log('Users:', users);

		return json({
			connected: true,
			tableFound,
			tables: tables.map((t) => t.table_name),
			userCount: users.length,
			message: 'Database is connected! Check server console for full user data.'
		});
	} catch (error) {
		console.error('Database connection failed:', error);

		return json(
			{
				connected: false,
				error: error.message
			},
			{ status: 500 }
		);
	}
}
