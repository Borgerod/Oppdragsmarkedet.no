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

				console.log('User table columns:', userColumns); // Only insert from customData, reject if no data is provided
				if (!customData) {
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
						// Extract the user data from the array if it's an array
						const userData = Array.isArray(customData)
							? customData[i % customData.length]
							: customData;

						// Make sure we have the userData
						if (!userData) {
							errors.push(`No user data provided for record ${i + 1}`);
							continue;
						}

						const rawUserId = userData.id;
						const userId = typeof rawUserId === 'string' ? rawUserId : rawUserId; // Preserve string ID
						const username = userData.username;

						console.log('Inserting user with direct SQL', {
							id: userId,
							username: username
						}); // Use SQL template literals for direct insertion						// Prepare location_data as POINT if provided
						let locationData = null;
						let locationPointX = null;
						let locationPointY = null;

						// Handle location_data in string format like "(10.7522, 59.9139)"
						if (userData.location_data && typeof userData.location_data === 'string') {
							try {
								// Extract the coordinates from the string
								const match = userData.location_data.match(/\((.*?),\s*(.*?)\)/);
								if (match && match.length === 3) {
									locationPointX = parseFloat(match[1]);
									locationPointY = parseFloat(match[2]);
								}
							} catch (e) {
								console.error('Failed to parse location_data:', e);
							}
						} else if (
							userData.location_data &&
							Array.isArray(userData.location_data) &&
							userData.location_data.length === 2
						) {
							locationPointX = parseFloat(userData.location_data[0]);
							locationPointY = parseFloat(userData.location_data[1]);
						}

						// // Generate safe SQL components
						// const keys = Object.keys(userData).map(k => `"${k}"`).join(', ');
						// // const values = Object.values(userData);
						// const values = Object.values(userData).map(v => {
						// 	if (v instanceof Date) return v.toISOString();
						// 	return v;
						// });
						// const valuePlaceholders = values.map((_, i) => `$${i + 1}`).join(', ');

						// // For libraries that support parameter expansion (like postgres.js):
						// const insertResult = await sql`
						// INSERT INTO "users" (${sql(keys.split(', '))})
						// VALUES (${sql(values)})
						// `;

						// // Alternative for pg library:
						// const query = {
						// text: `INSERT INTO "users" (${keys}) VALUES (${valuePlaceholders})`,
						// values: values
						// };
						// await client.query(query);
						const insert = await sql`
						INSERT INTO "users" ${sql(userData)}
						`;

						// 			const insertResult = await sql`
						//   INSERT INTO "users" (
						// 	"id",
						// 	"username",
						// 	"email",
						// 	"password_hash",
						// 	"date_joined",
						// 	"is_active",
						// 	"user_type",
						// 	"user_role",
						// 	"is_online",
						// 	"is_email_verified",
						// 	"is_phone_verified",
						// 	"location",
						// 	"location_data",
						// 	"last_login"
						//   ) VALUES (                ${userData.id},
						// 	${userData.username},
						// 	${userData.email || null},
						// 	${userData.password_hash || null},
						// 	${userData.date_joined || null},
						// 	${userData.is_active},
						// 	${userData.user_type},
						// 	${userData.user_role},
						// 	${userData.is_online},
						// 	${userData.is_email_verified},
						// 	${userData.is_phone_verified},
						// 	${userData.location || null},
						// 	${locationPointX !== null && locationPointY !== null ? sql`point(${locationPointX}, ${locationPointY})` : null},
						// 	${userData.last_login || null}
						//   )
						//   ON CONFLICT ("id") DO UPDATE SET
						// 	username = EXCLUDED.username,
						// 	email = EXCLUDED.email,
						// 	password_hash = EXCLUDED.password_hash,
						// 	date_joined = EXCLUDED.date_joined,
						// 	is_active = EXCLUDED.is_active,
						// 	user_type = EXCLUDED.user_type,
						// 	user_role = EXCLUDED.user_role,
						// 	is_online = EXCLUDED.is_online,
						// 	is_email_verified = EXCLUDED.is_email_verified,
						// 	is_phone_verified = EXCLUDED.is_phone_verified,
						// 	location = EXCLUDED.location,
						// 	location_data = EXCLUDED.location_data,
						// 	last_login = EXCLUDED.last_login
						//   RETURNING "id"
						// `;
						console.log('Insert result:', insertResult);

						// Consider the insertion successful if we get any result back
						if (insertResult) {
							results.push({
								success: true,
								data: {
									id: userId,
									username,
									email: userData?.email,
									date_joined: userData?.date_joined
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
		// Only insert custom data provided
		if (!customData) {
			return json(
				{
					success: false,
					message: 'No data provided for insertion'
				},
				{ status: 400 }
			);
		}

		// Insert each record from the provided custom data
		for (let i = 0; i < count; i++) {
			try {
				// Only use the provided custom data
				const recordData = Array.isArray(customData)
					? customData[i % customData.length]
					: customData;

				if (!recordData) {
					errors.push(`Invalid data provided for record ${i + 1}`);
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
					}); // Try a completely different approach without using unsafe
					// Build a dynamic SQL query for proper insertion

					// First, let's create a tagged template query directly
					// This is the proper way to use the postgres library safely

					// Create column placeholders for our query
					const sqlColumns = columnNames.map((name) => `"${name}"`).join(', ');

					// Generate value placeholders
					const sqlPlaceholders = columnNames.map((_, i) => `$${i + 1}`).join(', ');
					// Directly build a SQL statement with each value as a parameter
					// This is the standard way to use the postgres library
					let sqlStatement = sql`INSERT INTO ${tableName} (${sql.unsafe(sqlColumns)}) VALUES (`;
					console.log('___ INSIDE +server.ts _______________________');
					console.log('1) sqlStatement: ', sqlStatement);
					console.log('2) tableName: ', tableName);
					console.log('3) sql.unsafe(sqlColumns): ', sql.unsafe(sqlColumns));
					console.log('4) ${sql.unsafe(sqlColumns)}: ', `${sql.unsafe(sqlColumns)}`);
					console.log('5) sqlColumns: ', sqlColumns);
					console.log('6) columnValues: ', columnValues);
					console.log('7) columns: columnsStr: ', columnsStr);
					console.log('8) values: columnValues: ', columnValues);
					console.log('9) query: ', query);

					// Add each value separately as a parameter
					columnValues.forEach((val, i) => {
						if (i > 0) {
							sqlStatement = sql`${sqlStatement}, ${val}`;
						} else {
							sqlStatement = sql`${sqlStatement}${val}`;
						}
					});

					sqlStatement = sql`${sqlStatement})`;

					// Execute the statement
					const result = await sqlStatement;

					// Log the result
					console.log(`Inserted into ${tableName}:`, result);
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
