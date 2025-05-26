// // import { json } from '@sveltejs/kit';
// // import type { RequestEvent } from '@sveltejs/kit';
// // import postgres from 'postgres';
// // import { env } from '$env/dynamic/private';
// // // import { sql as drizzleSql } from 'drizzle-orm';

// // // Create a database connection for direct SQL execution
// // const sql = postgres(env.DATABASE_URL);

// // src/routes/api/data/+server.ts
// import { json } from '@sveltejs/kit';
// import type { RequestEvent } from '@sveltejs/kit';
// import postgres from 'postgres';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import { sql } from 'drizzle-orm';
// import type { PgInsertValue } from 'drizzle-orm/pg-core';
// import { env } from '$env/dynamic/private';

// const client = postgres(env.DATABASE_URL);
// const db = drizzle(client);

// // GET: List available tables
// export async function GET() {
// 	try {
// 		// Query to list all tables in the database
// 		const tables = await sql<{ table_name: string }[]>`
// 	  SELECT table_name
// 	  FROM information_schema.tables
// 	  WHERE table_schema = 'public'
// 	`;

// 		const tableNames = tables.map((t) => t.table_name);

// 		// Filter out spatial tables and format for UI display
// 		const availableTables = tableNames
// 			.filter(
// 				(name) =>
// 					name !== 'geography_columns' && name !== 'geometry_columns' && name !== 'spatial_ref_sys'
// 			)
// 			.map((name) => {
// 				let description;
// 				switch (name) {
// 					case 'users':
// 						description = 'User accounts';
// 						break;
// 					case 'sessions':
// 						description = 'User sessions';
// 						break;
// 					case 'vendors':
// 						description = 'Vendor profiles';
// 						break;
// 					case 'social_links':
// 						description = 'User social media links';
// 						break;
// 					case 'saved_filters':
// 						description = 'User saved search filters';
// 						break;
// 					case 'favorite_projects':
// 						description = 'User favorite projects';
// 						break;
// 					case 'following':
// 						description = 'User follow relationships';
// 						break;
// 					case 'active_projects':
// 						description = 'Ongoing projects';
// 						break;
// 					case 'completed_projects':
// 						description = 'Finished projects';
// 						break;
// 					case 'wallets':
// 						description = 'User/vendor wallets';
// 						break;
// 					case 'financial_transactions':
// 						description = 'Financial transactions';
// 						break;
// 					case 'wallet_transactions':
// 						description = 'Wallet transfers';
// 						break;
// 					case 'financial_stats':
// 						description = 'User financial statistics';
// 						break;
// 					default:
// 						description = `${name} table`;
// 						break;
// 				}
// 				return { name, description };
// 			});

// 		return json({
// 			success: true,
// 			message: 'Available tables for data population',
// 			tables: availableTables
// 		});
// 	} catch (error) {
// 		console.error('Error listing tables:', error);
// 		return json(
// 			{
// 				success: false,
// 				message: 'Failed to list available tables',
// 				error: error instanceof Error ? error.message : String(error)
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

// export async function POST({ request }: RequestEvent) {
// 	try {
// 		const data = await request.json();
// 		const { table: tableName, dataInput } = data;

// 		// For dynamic tables with proper typing
// 		const result = await db.execute<Record<string, unknown>>(sql`
//       INSERT INTO ${sql.identifier(tableName)}
//       ${sql.keyValues(dataInput as Record<string, PgInsertValue>)}
//       RETURNING *
//     `);

// 		// Access the first row directly from the array
// 		return json(result[0]);
// 	} catch (error) {
// 		console.error('Insert failed:', error);
// 		return json({ error: 'Insert failed' }, { status: 500 });
// 	}
// }
// // // POST: Add data to specified table
// // export async function POST({ request }: RequestEvent) {
// // 	try {
// // 		const data = await request.json();
// // 		const { table: tableName, count = 1, dataInput } = data;
// // 		// console.log('data: ', data);
// // 		// console.log('dataInput: ', dataInput);
// // 		if (!tableName) {
// // 			return json(
// // 				{
// // 					success: false,
// // 					message: 'Table name is required'
// // 				},
// // 				{ status: 400 }
// // 			);
// // 		}

// // 		// Check if table exists in database
// // 		const tables = await sql<{ table_name: string }[]>`
// // 	  SELECT table_name
// // 	  FROM information_schema.tables
// // 	  WHERE table_schema = 'public' AND table_name = ${tableName}
// // 	`;

// // 		if (tables.length === 0) {
// // 			return json(
// // 				{
// // 					success: false,
// // 					message: `Table "${tableName}" does not exist in the database`
// // 				},
// // 				{ status: 400 }
// // 			);
// // 		}

// // 		const results = [];
// // 		const errors = [];
// // 		// Special handling for users table due to schema complexity
// // 		// if (tableName === 'users') {
// // 		try {
// // 			const columnInfo = await sql<
// // 				{ column_name: string; data_type: string; is_nullable: string }[]
// // 			>`
// // 			SELECT column_name, data_type, is_nullable
// // 			FROM information_schema.columns
// // 			WHERE table_schema = 'public' AND table_name = ${tableName}
// // 			ORDER BY ordinal_position
// // 			`;

// // 			// console.log('table columns:', columnInfo); // Only insert from dataInput, reject if no data is provided
// // 			if (!dataInput) {
// // 				return json(
// // 					{
// // 						success: false,
// // 						message: 'No data provided for insertion'
// // 					},
// // 					{ status: 400 }
// // 				);
// // 			}
// // 			for (let i = 0; i < count; i++) {
// // 				try {
// // 					// Make sure we have the dataInput
// // 					if (!dataInput) {
// // 						errors.push(`No user data provided for record ${i + 1}`);
// // 						continue;
// // 					}
// // 					console.log('checkpoint [1]');
// // 					// > GET BACK
// // 					// if (tableName === 'users') {
// // 					// } else {
// // 					// 	console.log('user_id: ', dataInput.user_id);
// // 					// 	console.log('id: ', dataInput.id);
// // 					// }

// // 					// for (const key in dataInput) {
// // 					// 	if (typeof dataInput[key] === 'object') {
// // 					// 		dataInput[key] = JSON.stringify(dataInput[key]);
// // 					// 	}
// // 					// 	// Leave strings, numbers, booleans as-is
// // 					// }
// // 					// console.log(dataInput);

// // 					// const columns = Object.keys(dataInput);
// // 					// const values = columns.map((col) => dataInput[col]);

// // 					// const insertResult = await sql`
// // 					// INSERT INTO ${sql(tableName)}
// // 					// (${sql(columns as string[])})
// // 					// VALUES (${sql(values)})
// // 					// `;

// // 					// Prepare the data (your current approach is correct)
// // 					for (const key in dataInput) {
// // 						if (typeof dataInput[key] === 'object') {
// // 							console.log('Object was triggered');
// // 							console.log('	before', dataInput[key]);
// // 							dataInput[key] = JSON.stringify(dataInput[key]);
// // 							console.log('	after', dataInput[key]);
// // 						}
// // 						// Fix for user_profile: properly escape backslashes in JSON strings
// // 						if (typeof dataInput[key] === 'string') {
// // 							// PostgreSQL needs regex escaping when strings contain backslashes
// // 							console.log('String was triggered');
// // 							console.log('	before', dataInput[key]);
// // 							dataInput[key] = dataInput[key].replace(/\\/g, '\\\\');
// // 							console.log('	after', dataInput[key]);
// // 						}
// // 					}
// // 					// const insertResult = await sql`
// // 					// INSERT INTO ${sql(tableName)} ${sql(dataInput, ...Object.keys(dataInput))}
// // 					// `;

// // 					// async function dynamicInsert(tableName: string, data: Record<string, any>) {
// // 					const entries = Object.entries(dataInput);
// // 					const columns = entries.map(([k]) => k);
// // 					const values = entries.map(([, v]) => v);

// // 					// Use postgres's sql tag template correctly with proper interpolation
// // 					// Built dynamic SQL query with proper placeholders
// // 					const columnsFormatted = columns.map((col) => `"${col}"`).join(', ');
// // 					const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

// // 					const insertResult = await sql.unsafe(
// // 						`INSERT INTO "${tableName}" (${columnsFormatted}) VALUES (${placeholders})`,
// // 						...(values as any[])
// // 					);
// // 					// );
// // 					// }

// // 					// // Get columns and values
// // 					// const columns = Object.keys(dataInput).map((col) => col); // Ensure these are strings
// // 					// const values = Object.values(dataInput);

// // 					// try {
// // 					// 	const columns = Object.keys(dataInput);
// // 					// 	const values = Object.values(dataInput);

// // 					// 	const query = sql`
// // 					// 	INSERT INTO ${sql(tableName)}
// // 					// 	(${columns.map(col => sql(col))})
// // 					// 	VALUES (${sql(values)})
// // 					// 	`;

// // 					// 	const result = await query;
// // 					// 	return result;
// // 					// } catch (error) {
// // 					// 	console.error('Insert failed:', error);
// // 					// 	throw error;
// // 					// }
// // 					// }
// // 					// const columns = Object.keys(dataInput).map((col) => sql(col));
// // 					// const values = Object.values(dataInput);
// // 					// Option 1)
// // 					// const insertResult = await sql`
// // 					// INSERT INTO ${sql(tableName)}
// // 					// (${sql(columns)})
// // 					// VALUES (${sql(values)})
// // 					// `;
// // 					// // Option 2)
// // 					// const insertResult = await sql`
// // 					// INSERT INTO ${sql(tableName)} (${sql(Object.keys(dataInput).join(','))})
// // 					// VALUES (${Object.values(dataInput)})
// // 					// `;

// // 					// ! dont delete // const insertResult = await sql`INSERT INTO ${sql(tableName)} ${sql(dataInput)}`;
// // 					console.log('checkpoint [2]');

// // 					let id = '';
// // 					let userId = '';
// // 					let check_payload = {};
// // 					console.log('tableName: ', tableName);
// // 					if (tableName === 'users') {
// // 						userId = dataInput.id; // No type conversion needed
// // 						check_payload = {
// // 							id: userId,
// // 							username: dataInput.username,
// // 							email: dataInput?.email,
// // 							date_joined: dataInput?.date_joined
// // 						};
// // 					} else {
// // 						// Fixed: Don't reassign variables, just use the original values
// // 						check_payload = {
// // 							id: dataInput.id,
// // 							user_id: dataInput.user_id
// // 						};
// // 					}
// // 					// if (tableName === 'users') {
// // 					// 	id = typeof dataInput.id === 'string' ? dataInput.id : dataInput.id; // Preserve string ID
// // 					// 	check_payload = {
// // 					// 		id: id //user_id
// // 					// 	};
// // 					// 	// username: dataInput.username,
// // 					// 	// email: dataInput?.email,
// // 					// 	// date_joined: dataInput?.date_joined
// // 					// } else {
// // 					// 	// id = typeof dataInput.id === 'string' ? dataInput.id : dataInput.id; // Preserve string ID
// // 					// 	// userId = typeof dataInput.user_id === 'string' ? dataInput.user_id : dataInput.user_id; // Preserve string ID
// // 					// 	check_payload = {
// // 					// 		id: id
// // 					// 	};
// // 					// 	// user_id: dataInput.user_id
// // 					// }
// // 					// Consider the insertion successful if we get any result back
// // 					if (insertResult) {
// // 						results.push({
// // 							success: true,
// // 							data: check_payload
// // 						});
// // 						console.log('Data insertion successful, pushed to results:', results);
// // 					} else {
// // 						// Add proper error handling
// // 						errors.push(`Data insertion failed for ${tableName}`);
// // 						console.log('Data insertion failed, pushed to errors');
// // 					}

// // 					//
// // 					//
// // 					//
// // 					//
// // 					//
// // 					//
// // 					//
// // 					// } catch (insertErr) {
// // 					// 	console.error('User insertion error:', insertErr);
// // 					// 	errors.push(
// // 					// 		`Failed to insert user: ${insertErr instanceof Error ? insertErr.message : String(insertErr)}`
// // 					// 	);
// // 					// }
// // 				} catch (insertErr) {
// // 					console.error('User insertion error:', insertErr);
// // 					// Use a safer approach for error message extraction
// // 					let errorMessage = 'Unknown error';
// // 					if (insertErr instanceof Error) {
// // 						errorMessage = insertErr.message;
// // 					} else if (typeof insertErr === 'string') {
// // 						errorMessage = insertErr;
// // 					}
// // 					errors.push(`Failed to insert into ${tableName}: ${errorMessage}`);
// // 				}
// // 			}

// // 			return json({
// // 				success: results.length > 0,
// // 				message: `Added ${results.length} users (${errors.length} errors)`,
// // 				results,
// // 				errors: errors.length > 0 ? errors : undefined
// // 			});
// // 		} catch (err) {
// // 			console.error('Error handling user insertion:', err);
// // 			return json(
// // 				{
// // 					success: false,
// // 					message: 'Failed to insert users',
// // 					error: err instanceof Error ? err.message : String(err)
// // 				},
// // 				{ status: 500 }
// // 			);
// // 		}
// // 		// }

// // 		// 	// For other tables, proceed with dynamic column detection
// // 		// 	const columnInfo = await sql<{ column_name: string; data_type: string; is_nullable: string }[]>`
// // 		//   SELECT column_name, data_type, is_nullable
// // 		//   FROM information_schema.columns
// // 		//   WHERE table_schema = 'public' AND table_name = ${tableName}
// // 		//   ORDER BY ordinal_position
// // 		// `;
// // 		// 	// Only insert custom data provided
// // 		// 	if (!dataInput) {
// // 		// 		return json(
// // 		// 			{
// // 		// 				success: false,
// // 		// 				message: 'No data provided for insertion'
// // 		// 			},
// // 		// 			{ status: 400 }
// // 		// 		);
// // 		// 	}

// // 		// 	// Insert each record from the provided custom data
// // 		// 	for (let i = 0; i < count; i++) {
// // 		// 		try {
// // 		// 			// Only use the provided custom data
// // 		// 			const recordData = Array.isArray(dataInput) ? dataInput[i % dataInput.length] : dataInput;

// // 		// 			if (!recordData) {
// // 		// 				errors.push(`Invalid data provided for record ${i + 1}`);
// // 		// 				continue;
// // 		// 			}

// // 		// 			// Ensure all record values are properly formatted
// // 		// 			for (const key in recordData) {
// // 		// 				// Convert any objects or arrays to JSON strings
// // 		// 				if (typeof recordData[key] === 'object' && recordData[key] !== null) {
// // 		// 					recordData[key] = JSON.stringify(recordData[key]);
// // 		// 				}
// // 		// 			}

// // 		// 			// Get column names and values that match columns in the actual database
// // 		// 			const columnNames = Object.keys(recordData).filter((key) =>
// // 		// 				columnInfo.some((col) => col.column_name === key)
// // 		// 			);

// // 		// 			if (columnNames.length === 0) {
// // 		// 				errors.push(`No matching columns found in table ${tableName}`);
// // 		// 				continue;
// // 		// 			}

// // 		// 			const columnValues = columnNames.map((name) => recordData[name]);

// // 		// 			// Create parameterized query with properly quoted identifiers
// // 		// 			const columnsStr = columnNames.map((name) => `"${name}"`).join(', ');
// // 		// 			const placeholders = columnNames.map((_, i) => `$${i + 1}`).join(', ');

// // 		// 			const query = `INSERT INTO "${tableName}" (${columnsStr}) VALUES (${placeholders})`;
// // 		// 			try {
// // 		// 				// Print debug info to console
// // 		// 				console.log(`Inserting into table ${tableName}:`, {
// // 		// 					columns: columnsStr,
// // 		// 					values: columnValues,
// // 		// 					query
// // 		// 				}); // Try a completely different approach without using unsafe
// // 		// 				// Build a dynamic SQL query for proper insertion

// // 		// 				// First, let's create a tagged template query directly
// // 		// 				// This is the proper way to use the postgres library safely

// // 		// 				// Create column placeholders for our query
// // 		// 				const sqlColumns = columnNames.map((name) => `"${name}"`).join(', ');

// // 		// 				// Generate value placeholders
// // 		// 				const sqlPlaceholders = columnNames.map((_, i) => `$${i + 1}`).join(', ');
// // 		// 				// Directly build a SQL statement with each value as a parameter
// // 		// 				// This is the standard way to use the postgres library
// // 		// 				let sqlStatement = sql`INSERT INTO ${tableName} (${sql.unsafe(sqlColumns)}) VALUES (`;
// // 		// 				console.log('___ INSIDE +server.ts _______________________');
// // 		// 				console.log('1) sqlStatement: ', sqlStatement);
// // 		// 				console.log('2) tableName: ', tableName);
// // 		// 				console.log('3) sql.unsafe(sqlColumns): ', sql.unsafe(sqlColumns));
// // 		// 				console.log('4) ${sql.unsafe(sqlColumns)}: ', `${sql.unsafe(sqlColumns)}`);
// // 		// 				console.log('5) sqlColumns: ', sqlColumns);
// // 		// 				console.log('6) columnValues: ', columnValues);
// // 		// 				console.log('7) columns: columnsStr: ', columnsStr);
// // 		// 				console.log('8) values: columnValues: ', columnValues);
// // 		// 				console.log('9) query: ', query);

// // 		// 				// Add each value separately as a parameter
// // 		// 				columnValues.forEach((val, i) => {
// // 		// 					if (i > 0) {
// // 		// 						sqlStatement = sql`${sqlStatement}, ${val}`;
// // 		// 					} else {
// // 		// 						sqlStatement = sql`${sqlStatement}${val}`;
// // 		// 					}
// // 		// 				});

// // 		// 				sqlStatement = sql`${sqlStatement})`;

// // 		// 				// Execute the statement
// // 		// 				const result = await sqlStatement;

// // 		// 				// Log the result
// // 		// 				console.log(`Inserted into ${tableName}:`, result);
// // 		// 			} catch (insertErr) {
// // 		// 				console.error('SQL insertion error:', insertErr);
// // 		// 				throw new Error(
// // 		// 					`Failed to insert record: ${insertErr instanceof Error ? insertErr.message : String(insertErr)}`
// // 		// 				);
// // 		// 			}

// // 		// 			results.push({ success: true, data: recordData });
// // 		// 		} catch (err) {
// // 		// 			console.error(`Error inserting record ${i + 1} into ${tableName}:`, err);
// // 		// 			errors.push(`Record ${i + 1}: ${err instanceof Error ? err.message : String(err)}`);
// // 		// 		}
// // 		// 	}

// // 		// 	return json({
// // 		// 		success: errors.length === 0,
// // 		// 		message: `Added ${results.length} records to ${tableName}`,
// // 		// 		results,
// // 		// 		errors: errors.length > 0 ? errors : undefined
// // 		// 	});
// // 	} catch (error) {
// // 		console.error('Error processing request:', error);
// // 		return json(
// // 			{
// // 				success: false,
// // 				message: 'Failed to process request',
// // 				error: error instanceof Error ? error.message : String(error)
// // 			},
// // 			{ status: 500 }
// // 		);
// // 	}
// // }

// // DELETE: Clear data from a table
// export async function DELETE({ request }: RequestEvent) {
// 	try {
// 		const data = await request.json();
// 		const { table: tableName } = data;

// 		if (!tableName) {
// 			return json(
// 				{
// 					success: false,
// 					message: 'Table name is required'
// 				},
// 				{ status: 400 }
// 			);
// 		}

// 		// Check if table exists in database
// 		const tables = await sql<{ table_name: string }[]>`
// 	  SELECT table_name
// 	  FROM information_schema.tables
// 	  WHERE table_schema = 'public' AND table_name = ${tableName}
// 	`;

// 		if (tables.length === 0) {
// 			return json(
// 				{
// 					success: false,
// 					message: `Table "${tableName}" does not exist in the database`
// 				},
// 				{ status: 400 }
// 			);
// 		}

// 		// Execute DELETE with direct SQL
// 		await sql.unsafe(`DELETE FROM "${tableName}"`);

// 		return json({
// 			success: true,
// 			message: `Cleared data from ${tableName}`
// 		});
// 	} catch (error) {
// 		console.error('Error clearing table data:', error);
// 		return json(
// 			{
// 				success: false,
// 				message: 'Failed to clear table data',
// 				error: error instanceof Error ? error.message : String(error)
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

// // //Type for a generic database record
// // interface Record {
// // 	[key: string]: any;
// // }
