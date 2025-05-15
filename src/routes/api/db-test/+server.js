import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/ignore/schema';
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

		const tableNames = tables.map((t) => t.table_name);
		console.log('Tables in database:', tableNames);

		// Create a map to store our test results
		const tableResults = {};

		// Test each table
		for (const tableName of tableNames) {
			try {
				// Use unsafe method for proper SQL query execution
				const result = await client.unsafe(`SELECT COUNT(*) FROM "${tableName}"`);

				tableResults[tableName] = {
					exists: true,
					count: parseInt(result[0].count),
					error: null
				};
				console.log(`Table "${tableName}" exists with ${result[0].count} records`);
			} catch (error) {
				tableResults[tableName] = {
					exists: false,
					count: 0,
					error: error instanceof Error ? error.message : String(error)
				};
				console.log(
					`Table "${tableName}" does not exist or has an issue: ${error instanceof Error ? error.message : String(error)}`
				);
			}
		}

		// Check database structure to debug schema issues
		const schemaInfo = {};

		// Get column details for users table
		try {
			const userColumns = await client`
				SELECT column_name, data_type, is_nullable
				FROM information_schema.columns
				WHERE table_name = 'users' 
			`;

			schemaInfo.users = {
				columns: userColumns.map((col) => ({
					name: col.column_name,
					type: col.data_type,
					nullable: col.is_nullable
				}))
			};

			console.log('Users table structure:', schemaInfo.users);

			// Try to get sample data
			if (tableResults.users && tableResults.users.count > 0) {
				const sampleUsers = await client.unsafe(`SELECT * FROM "users" LIMIT 1`);
				schemaInfo.userSample = sampleUsers[0];
				console.log('Sample user data:', sampleUsers[0]);
			}
		} catch (error) {
			schemaInfo.usersError = error instanceof Error ? error.message : String(error);
			console.error('Error getting users table structure:', error);
		}

		// Get column details for sessions table if it exists
		try {
			const sessionColumns = await client`
				SELECT column_name, data_type, is_nullable
				FROM information_schema.columns
				WHERE table_name = 'sessions'
			`;

			schemaInfo.sessions = {
				columns: sessionColumns.map((col) => ({
					name: col.column_name,
					type: col.data_type,
					nullable: col.is_nullable
				}))
			};

			console.log('Sessions table structure:', schemaInfo.sessions);
		} catch (error) {
			schemaInfo.sessionsError = error instanceof Error ? error.message : String(error);
			console.error('Error getting sessions table structure:', error);
		}

		return json({
			connected: true,
			tables: tableNames,
			tableResults,
			schemaInfo,
			message: 'Database is connected! Check server console for full results.'
		});
	} catch (error) {
		console.error(
			'Database connection failed:',
			error instanceof Error ? error.message : String(error)
		);

		return json(
			{
				connected: false,
				error: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
}
