import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
// import { sql as drizzleSql } from 'drizzle-orm';

// Create a database connection for direct SQL execution
const sql = postgres(env.DATABASE_URL);

// Type for a generic database record
interface Record {
	[key: string]: any;
}

// GET: List available tables
export async function GET() {
	try {
		// Query to list all tables in the database
		const tables = await sql<{ table_name: string }[]>`
	  SELECT table_name 
	  FROM information_schema.tables 
	  WHERE table_schema = 'public'
	`;

		const tableNames = tables.map((t) => t.table_name);

		// Filter out spatial tables and format for UI display
		const availableTables = tableNames
			.filter(
				(name) =>
					name !== 'geography_columns' && name !== 'geometry_columns' && name !== 'spatial_ref_sys'
			)
			.map((name) => {
				let description;
				switch (name) {
					case 'users':
						description = 'User accounts';
						break;
					case 'sessions':
						description = 'User sessions';
						break;
					case 'vendors':
						description = 'Vendor profiles';
						break;
					case 'social_links':
						description = 'User social media links';
						break;
					case 'saved_filters':
						description = 'User saved search filters';
						break;
					case 'favorite_projects':
						description = 'User favorite projects';
						break;
					case 'following':
						description = 'User follow relationships';
						break;
					case 'active_projects':
						description = 'Ongoing projects';
						break;
					case 'completed_projects':
						description = 'Finished projects';
						break;
					case 'wallets':
						description = 'User/vendor wallets';
						break;
					case 'financial_transactions':
						description = 'Financial transactions';
						break;
					case 'wallet_transactions':
						description = 'Wallet transfers';
						break;
					case 'financial_stats':
						description = 'User financial statistics';
						break;
					default:
						description = `${name} table`;
						break;
				}
				return { name, description };
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





import { db } from './your-drizzle-config'; // Your Drizzle instance
import { users } from './your-schema'; // Your schema

// async function insertUser(dataInput: typeof users.$inferInsert) {
export async function POST(dataInput: typeof users.$inferInsert) {
  try {
    // Drizzle automatically handles JSON serialization
    const result = await db.insert(users).values(dataInput).returning();
    return result;
  } catch (error) {
    console.error('Insert failed:', error);
    throw error;
  }
}


// POST: Add data to specified table
export async function POST({ request }: RequestEvent) {
	try {
		const data = await request.json();
		const { table: tableName, count = 1, dataInput } = data;
		// console.log('data: ', data);
		// console.log('dataInput: ', dataInput);
		if (!tableName) {
			return json(
				{
					success: false,
					message: 'Table name is required'
				},
				{ status: 400 }
			);
		}

		// Check if table exists in database
		const tables = await sql<{ table_name: string }[]>`
	  SELECT table_name 
	  FROM information_schema.tables 
	  WHERE table_schema = 'public' AND table_name = ${tableName}
	`;

		if (tables.length === 0) {
			return json(
				{
					success: false,
					message: `Table "${tableName}" does not exist in the database`
				},
				{ status: 400 }
			);
		}

		const results = [];
		const errors = [];
		// Special handling for users table due to schema complexity
		// if (tableName === 'users') {
		try {
			const columnInfo = await sql<
				{ column_name: string; data_type: string; is_nullable: string }[]
			>`
			SELECT column_name, data_type, is_nullable
			FROM information_schema.columns
			WHERE table_schema = 'public' AND table_name = ${tableName}
			ORDER BY ordinal_position
			`;

			// console.log('table columns:', columnInfo); // Only insert from dataInput, reject if no data is provided
			if (!dataInput) {
				return json(
					{
						success: false,
						message: 'No data provided for insertion'
					},
					{ status: 400 }
				);
			}
			for (let i = 0; i < count; i++) {
				try {
					// Make sure we have the dataInput
					if (!dataInput) {
						errors.push(`No user data provided for record ${i + 1}`);
						continue;
					}
					console.log('checkpoint [1]');

					for (const key in dataInput) {
						if (typeof dataInput[key] === 'object') {
							console.log('Object was triggered');
							console.log('	before', dataInput[key]);
							dataInput[key] = JSON.stringify(dataInput[key]);
							console.log('	after', dataInput[key]);
						}
						// Fix for user_profile: properly escape backslashes in JSON strings
						if (typeof dataInput[key] === 'string') {
							// PostgreSQL needs regex escaping when strings contain backslashes
							console.log('String was triggered');
							console.log('	before', dataInput[key]);
							dataInput[key] = dataInput[key].replace(/\\/g, '\\\\');
							console.log('	after', dataInput[key]);
						}
					}
					const entries = Object.entries(dataInput);
					const columns = entries.map(([k]) => k);
					const values = entries.map(([, v]) => v);

				const columnsFormatted = columns.map((col) => `"${col}"`).join(', ');
					const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

					const insertResult = await sql.unsafe(
						`INSERT INTO "${tableName}" (${columnsFormatted}) VALUES (${placeholders})`,
						...(values as any[])
					);

					let id = '';
					let userId = '';
					let check_payload = {};
					console.log('tableName: ', tableName);
					if (tableName === 'users') {
						userId = dataInput.id; // No type conversion needed
						check_payload = {
							id: userId,
							username: dataInput.username,
							email: dataInput?.email,
							date_joined: dataInput?.date_joined
						};
					} else {
						check_payload = {
							id: dataInput.id,
							user_id: dataInput.user_id
						};
					}
\
					if (insertResult) {
						results.push({
							success: true,
							data: check_payload
						});
						console.log('Data insertion successful, pushed to results:', results);
					} else {
						// Add proper error handling
						errors.push(`Data insertion failed for ${tableName}`);
						console.log('Data insertion failed, pushed to errors');
					}


				} catch (insertErr) {
					console.error('User insertion error:', insertErr);
					// Use a safer approach for error message extraction
					let errorMessage = 'Unknown error';
					if (insertErr instanceof Error) {
						errorMessage = insertErr.message;
					} else if (typeof insertErr === 'string') {
						errorMessage = insertErr;
					}
					errors.push(`Failed to insert into ${tableName}: ${errorMessage}`);
				}
			}

			return json({
				success: results.length > 0,
				message: `Added ${results.length} users (${errors.length} errors)`,
				results,
				errors: errors.length > 0 ? errors : undefined
			});
		} catch (err) {
			console.error('Error handling user insertion:', err);
			return json(
				{
					success: false,
					message: 'Failed to insert users',
					error: err instanceof Error ? err.message : String(err)
				},
				{ status: 500 }
			);
		}
	
	} catch (error) {
		console.error('Error processing request:', error);
		return json(
			{
				success: false,
				message: 'Failed to process request',
				error: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
}

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

		const tables = await sql<{ table_name: string }[]>`
	  SELECT table_name 
	  FROM information_schema.tables 
	  WHERE table_schema = 'public' AND table_name = ${tableName}
	`;

		if (tables.length === 0) {
			return json(
				{
					success: false,
					message: `Table "${tableName}" does not exist in the database`
				},
				{ status: 400 }
			);
		}

		await sql.unsafe(`DELETE FROM "${tableName}"`);

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
