// import { pgTable, text, integer, timestamp, json } from 'drizzle-orm/pg-core';

// // Import all additional schema tables
// export * from './schema-extensions';

// export const user = pgTable('users', {
// 	id: text('id').primaryKey(),
// 	username: text('username').notNull().unique(),
// 	passwordHash: text('password_hash').notNull(),
// 	user_type: json('user_type'), // Store as JSON array
// 	listing_access: json('listing_access'), // Store as JSON array
// 	listings: json('listings'), // Store as JSON array
// 	first_name: text('first_name'),
// 	sur_name: text('sur_name'),
// 	birth_date: text('birth_date'),
// 	date_joined: text('date_joined'),
// 	field: text('field')
// });

// export const session = pgTable('sessions', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
// });
