import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import * as schema from '$lib/server/db/optimized_schema_v2';

/**
 * GET endpoint for retrieving tables and their data
 */
export async function GET() {
	try {
		// Get all exported items from schema
		const names = Object.keys(schema);

		// Filter out non-table items and process for display
		const availableTables = names
			.filter((name) => {
				// Skip these system tables and non-table items
				const skipItems = ['geography_columns', 'geometry_columns', 'spatial_ref_sys'];
				const isSystemItem = skipItems.includes(name);
				// Try to check if it's a table object (having schema info)
				const schemaItem = (schema as Record<string, any>)[name];
				const isTable =
					schemaItem &&
					typeof schemaItem === 'object' &&
					(schemaItem._.symbol || schemaItem.$table?.name);

				return !isSystemItem && isTable;
			})
			.map((name) => {
				// Process enum names by removing "StatusEnum" or "Enum" suffix
				let displayName = name;
				if (displayName.endsWith('StatusEnum')) {
					displayName = displayName.replace('StatusEnum', '');
				} else if (displayName.endsWith('Enum')) {
					displayName = displayName.replace('Enum', '');
				}

				// Determine a user-friendly description
				let description;
				switch (name) {
					case 'users':
						description = 'User accounts';
						break;
					case 'user_profiles':
						description = 'User profile information';
						break;
					case 'sessions':
						description = 'User sessions';
						break;
					case 'projects':
						description = 'All projects';
						break;
					case 'vendorProfiles':
						description = 'Vendor profiles';
						break;
					case 'socialMedia':
						description = 'User social media links';
						break;
					case 'savedFilters':
						description = 'User saved search filters';
						break;
					case 'favoriteProjects':
						description = 'User favorite projects';
						break;
					case 'followedClients':
						description = 'User follow relationships';
						break;
					case 'wallets':
						description = 'User/vendor wallets';
						break;
					case 'financialTransactions':
						description = 'Financial transactions';
						break;
					case 'walletTransactions':
						description = 'Wallet transfers';
						break;
					case 'financialStats':
						description = 'User financial statistics';
						break;
					default:
						description = `${displayName} table`;
						break;
				}

				return { name: displayName, description };
			});

		return json({
			success: true,
			message: 'Available tables for data population',
			tables: availableTables
		});
	} catch (error) {
		console.error('Error listing tables:', error);
		return json(
			{
				success: false,
				message: 'Failed to list available tables',
				error: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
}

/**
 * POST endpoint for inserting data
 */
export async function POST({ request }: RequestEvent) {
	try {
		const data = await request.json();
		const { table: tableName, dataInput } = data;

		// Validate required fields
		if (!tableName) {
			return json(
				{
					success: false,
					message: 'Table name is required'
				},
				{ status: 400 }
			);
		}

		if (!dataInput) {
			return json(
				{
					success: false,
					message: 'Data input is required'
				},
				{ status: 400 }
			);
		}

		// Find the table in the schema
		const tableObj = schema[tableName];
		if (!tableObj) {
			return json(
				{
					success: false,
					message: `Table "${tableName}" not found in schema`
				},
				{ status: 400 }
			);
		}

		// Insert data using dynamic table reference
		const results = await db.insert(tableObj).values(dataInput).returning();

		return json({
			success: true,
			message: `Data added to ${tableName}`,
			results
		});
	} catch (error) {
		console.error('Error adding data:', error);
		return json(
			{
				success: false,
				message: 'Failed to add data',
				error: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
}

/**
 * DELETE endpoint for clearing tables
 */
export async function DELETE({ request }: RequestEvent) {
	try {
		const data = await request.json();
		const { table: tableName } = data;

		if (!tableName) {
			return json(
				{
					success: false,
					message: 'Table name is required'
				},
				{ status: 400 }
			);
		}

		// Get the table from schema
		const tableObj = schema[tableName];
		if (!tableObj) {
			return json(
				{
					success: false,
					message: `Table "${tableName}" not found in schema`
				},
				{ status: 400 }
			);
		}

		// Execute delete query using drizzle's SQL template
		await db.delete(tableObj).execute();

		return json({
			success: true,
			message: `Cleared data from ${tableName}`
		});
	} catch (error) {
		console.error('Error clearing table data:', error);
		return json(
			{
				success: false,
				message: 'Failed to clear table data',
				error: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
}
