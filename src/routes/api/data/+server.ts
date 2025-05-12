import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

// Create a database connection for direct SQL execution
const sql = postgres(env.DATABASE_URL);

// Type for a generic database record
interface Record {
	[key: string]: any;
}

// Helper function to generate mock data for various tables
function generateMockData(tableName: string): Record | null {
	switch (tableName) {
		case 'users': {
			// Generate a unique user with minimal fields to avoid schema conflicts
			const userId = Math.floor(2000 + Math.random() * 5000).toString();
			return {
				id: userId,
				username: `simple_user_${userId}`,
				password_hash: 'mockPasswordHash123'
			};
		}
		case 'sessions': {
			const sessionId = `sess_${Math.random().toString(36).substring(2, 15)}`;
			return {
				id: sessionId,
				user_id: Math.floor(2000 + Math.random() * 5000).toString(),
				expires_at: new Date(Date.now() + 86400000).toISOString()
			};
		}
		case 'vendors': {
			const vendorId = Math.floor(3000 + Math.random() * 5000).toString();
			const userId = Math.floor(2000 + Math.random() * 5000).toString();
			return {
				id: vendorId,
				user_id: userId,
				business_name: `Business Name ${Math.floor(Math.random() * 1000)}`,
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				contact_email: `contact${Math.floor(Math.random() * 1000)}@example.com`,
				contact_phone: `+47 ${Math.floor(Math.random() * 10000000)}`,
				website: 'https://example.com',
				location: 'Oslo, Norway',
				services_offered: JSON.stringify(['Service 1', 'Service 2']),
				rating: (Math.random() * 5).toFixed(1).toString(),
				date_joined: new Date().toISOString(),
				status: 'active'
			};
		}
		case 'social_links': {
			const platforms = ['facebook', 'twitter', 'instagram', 'linkedin'];
			const platform = platforms[Math.floor(Math.random() * platforms.length)];
			return {
				id: Math.floor(4000 + Math.random() * 5000).toString(),
				user_id: Math.floor(2000 + Math.random() * 5000).toString(),
				platform: platform,
				url: `https://${platform}.com/user${Math.floor(Math.random() * 1000)}`,
				username: `user${Math.floor(Math.random() * 1000)}`
			};
		}
		case 'saved_filters': {
			return {
				id: Math.floor(5000 + Math.random() * 5000).toString(),
				user_id: Math.floor(2000 + Math.random() * 5000).toString(),
				name: `Filter ${Math.floor(Math.random() * 100)}`,
				filters: JSON.stringify({
					category: 'technology',
					price: { min: 100, max: 500 },
					location: 'Oslo'
				}),
				date_created: new Date().toISOString()
			};
		}
		case 'favorite_projects': {
			return {
				id: Math.floor(6000 + Math.random() * 5000).toString(),
				user_id: Math.floor(2000 + Math.random() * 5000).toString(),
				project_id: Math.floor(9000 + Math.random() * 5000).toString(),
				date_saved: new Date().toISOString()
			};
		}
		case 'following': {
			return {
				id: Math.floor(7000 + Math.random() * 5000).toString(),
				follower_id: Math.floor(2000 + Math.random() * 5000).toString(),
				following_id: Math.floor(2000 + Math.random() * 5000).toString(),
				following_type: Math.random() > 0.5 ? 'user' : 'vendor',
				date_followed: new Date().toISOString()
			};
		}
		case 'active_projects': {
			return {
				id: Math.floor(9000 + Math.random() * 5000).toString(),
				title: `Project Title ${Math.floor(Math.random() * 1000)}`,
				description: 'This is a mock project description.',
				client_id: Math.floor(2000 + Math.random() * 5000).toString(),
				vendor_id: Math.floor(3000 + Math.random() * 5000).toString(),
				budget: Math.floor(Math.random() * 10000).toString(),
				status: 'in progress',
				start_date: new Date().toISOString(),
				expected_end_date: new Date(Date.now() + 30 * 86400000).toISOString(),
				location: 'Oslo, Norway',
				tags: JSON.stringify(['tag1', 'tag2']),
				requirements: JSON.stringify(['req1', 'req2'])
			};
		}
		case 'completed_projects': {
			return {
				id: Math.floor(10000 + Math.random() * 5000).toString(),
				title: `Completed Project ${Math.floor(Math.random() * 1000)}`,
				description: 'This is a completed project description.',
				client_id: Math.floor(2000 + Math.random() * 5000).toString(),
				vendor_id: Math.floor(3000 + Math.random() * 5000).toString(),
				budget: Math.floor(Math.random() * 10000).toString(),
				status: 'completed',
				start_date: new Date(Date.now() - 60 * 86400000).toISOString(),
				completed_date: new Date().toISOString(),
				location: 'Bergen, Norway',
				tags: JSON.stringify(['tag1', 'tag2']),
				client_review: 'Great work!',
				client_rating: (Math.floor(Math.random() * 5) + 1).toString(),
				vendor_review: 'Great client!',
				vendor_rating: (Math.floor(Math.random() * 5) + 1).toString()
			};
		}
		case 'wallets': {
			return {
				id: Math.floor(11000 + Math.random() * 5000).toString(),
				user_id: Math.floor(2000 + Math.random() * 5000).toString(),
				balance: Math.floor(Math.random() * 10000).toString(),
				currency: 'NOK',
				last_updated: new Date().toISOString()
			};
		}
		case 'financial_transactions': {
			const walletId = Math.floor(11000 + Math.random() * 5000);
			return {
				id: Math.floor(12000 + Math.random() * 5000).toString(),
				wallet_id: walletId.toString(),
				transaction_type: ['deposit', 'withdrawal', 'payment'][Math.floor(Math.random() * 3)],
				amount: Math.floor(Math.random() * 1000).toString(),
				currency: 'NOK',
				description: 'Transaction description',
				status: ['pending', 'completed', 'failed'][Math.floor(Math.random() * 3)],
				created_at: new Date().toISOString(),
				completed_at: new Date().toISOString()
			};
		}
		case 'wallet_transactions': {
			return {
				id: Math.floor(13000 + Math.random() * 5000).toString(),
				sender_wallet_id: Math.floor(11000 + Math.random() * 5000).toString(),
				receiver_wallet_id: Math.floor(11000 + Math.random() * 5000).toString(),
				amount: Math.floor(Math.random() * 1000).toString(),
				currency: 'NOK',
				status: ['pending', 'completed', 'failed'][Math.floor(Math.random() * 3)],
				description: 'Wallet transaction description',
				project_id: Math.floor(9000 + Math.random() * 5000).toString(),
				created_at: new Date().toISOString(),
				completed_at: new Date().toISOString()
			};
		}
		case 'financial_stats': {
			return {
				id: Math.floor(14000 + Math.random() * 5000).toString(),
				user_id: Math.floor(2000 + Math.random() * 5000).toString(),
				total_earned: Math.floor(Math.random() * 100000).toString(),
				total_spent: Math.floor(Math.random() * 50000).toString(),
				average_project_value: Math.floor(Math.random() * 5000).toString(),
				currency: 'NOK',
				last_updated: new Date().toISOString()
			};
		}
		default:
			return null;
	}
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

// POST: Add data to specified table
export async function POST({ request }: RequestEvent) {
	try {
		const data = await request.json();
		const { table: tableName, count = 1, customData } = data;

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
		if (tableName === 'users') {
			try {
				// Get user column information to ensure we have an understanding of the schema
				const userColumns = await sql<
					{ column_name: string; data_type: string; is_nullable: string }[]
				>`
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'users'
          ORDER BY ordinal_position
        `;

				console.log('User table columns:', userColumns);

				for (let i = 0; i < count; i++) {
					try {
						// Simplify - use direct SQL query with customData or defaults
						const rawUserId = customData?.id || Math.floor(2000 + Math.random() * 5000);
						const userId = typeof rawUserId === 'string' ? parseInt(rawUserId, 10) : rawUserId;
						const username = customData?.username || `user_${userId}`;

						console.log('Inserting user with direct SQL', {
							id: userId,
							username: username
						});

						// Use SQL template literals for direct insertion
						const insertResult = await sql`
              INSERT INTO "users" (
                "id", 
                "username", 
                "email", 
                "password_hash", 
                "date_joined", 
                "is_active", 
                "user_type", 
                "is_online", 
                "is_email_verified", 
                "is_phone_verified"
              ) VALUES (
                ${userId}, 
                ${customData?.username || `user_${userId}`}, 
                ${customData?.email || `${username}@example.com`}, 
                ${customData?.password_hash || 'mockPasswordHash123'}, 
                ${customData?.date_joined || new Date().toISOString()}, 
                ${customData?.is_active !== undefined ? customData.is_active : true}, 
                ${customData?.user_type || 'user'}, 
                ${customData?.is_online !== undefined ? customData.is_online : false}, 
                ${customData?.is_email_verified !== undefined ? customData.is_email_verified : false}, 
                ${customData?.is_phone_verified !== undefined ? customData.is_phone_verified : false}
              )
              ON CONFLICT ("id") DO NOTHING
              RETURNING "id"
            `;
						console.log('Insert result:', insertResult);

						// Consider the insertion successful if we get any result back
						if (insertResult) {
							results.push({
								success: true,
								data: {
									id: userId,
									username,
									email: customData?.email,
									date_joined: customData?.date_joined
								}
							});
							console.log('User insertion successful, pushed to results:', results);
						} else {
							errors.push(`User with ID ${userId} already exists or insertion failed`);
							console.log('User insertion failed, pushed to errors');
						}
					} catch (insertErr) {
						console.error('User insertion error:', insertErr);
						errors.push(
							`Failed to insert user: ${insertErr instanceof Error ? insertErr.message : String(insertErr)}`
						);
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
		}

		// For other tables, proceed with dynamic column detection
		const columnInfo = await sql<{ column_name: string; data_type: string; is_nullable: string }[]>`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = ${tableName}
      ORDER BY ordinal_position
    `;

		// Generate and insert data
		for (let i = 0; i < count; i++) {
			try {
				// Use custom data if provided, otherwise generate mock data
				const recordData = customData || generateMockData(tableName);

				if (!recordData) {
					errors.push(`Mock data generation not implemented for table: ${tableName}`);
					continue;
				}

				// Ensure all record values are properly formatted
				for (const key in recordData) {
					// Convert any objects or arrays to JSON strings
					if (typeof recordData[key] === 'object' && recordData[key] !== null) {
						recordData[key] = JSON.stringify(recordData[key]);
					}
				}

				// Get column names and values that match columns in the actual database
				const columnNames = Object.keys(recordData).filter((key) =>
					columnInfo.some((col) => col.column_name === key)
				);

				if (columnNames.length === 0) {
					errors.push(`No matching columns found in table ${tableName}`);
					continue;
				}

				const columnValues = columnNames.map((name) => recordData[name]);

				// Create parameterized query with properly quoted identifiers
				const columnsStr = columnNames.map((name) => `"${name}"`).join(', ');
				const placeholders = columnNames.map((_, i) => `$${i + 1}`).join(', ');

				const query = `INSERT INTO "${tableName}" (${columnsStr}) VALUES (${placeholders})`;

				try {
					// Print debug info to console
					console.log(`Inserting into table ${tableName}:`, {
						columns: columnsStr,
						values: columnValues,
						query
					});

					await sql.unsafe(query, ...columnValues);
				} catch (insertErr) {
					console.error('SQL insertion error:', insertErr);
					throw new Error(
						`Failed to insert record: ${insertErr instanceof Error ? insertErr.message : String(insertErr)}`
					);
				}

				results.push({ success: true, data: recordData });
			} catch (err) {
				console.error(`Error inserting record ${i + 1} into ${tableName}:`, err);
				errors.push(`Record ${i + 1}: ${err instanceof Error ? err.message : String(err)}`);
			}
		}

		return json({
			success: errors.length === 0,
			message: `Added ${results.length} records to ${tableName}`,
			results,
			errors: errors.length > 0 ? errors : undefined
		});
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

// DELETE: Clear data from a table
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

		// Execute DELETE with direct SQL
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
