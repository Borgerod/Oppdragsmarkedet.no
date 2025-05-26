// import { pgTable, text, integer, json, timestamp } from 'drizzle-orm/pg-core';

// // Vendors table - for service/project providers
// export const vendors = pgTable('vendors', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	businessName: text('business_name'),
// 	description: text('description'),
// 	contactEmail: text('contact_email'),
// 	contactPhone: text('contact_phone'),
// 	website: text('website'),
// 	location: text('location'),
// 	servicesOffered: json('services_offered'),
// 	rating: text('rating'),
// 	dateJoined: text('date_joined'),
// 	status: text('status')
// });

// // Social links table - for user social media profiles
// export const socialLinks = pgTable('social_links', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	platform: text('platform').notNull(),
// 	url: text('url').notNull(),
// 	username: text('username')
// });

// // Saved filters table - for user's saved search filters
// export const savedFilters = pgTable('saved_filters', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	name: text('name').notNull(),
// 	filters: json('filters').notNull(),
// 	dateCreated: timestamp('date_created').notNull()
// });

// // Favorite projects - for users' favorite/saved projects
// export const favoriteProjects = pgTable('favorite_projects', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	projectId: text('project_id').notNull(),
// 	dateSaved: timestamp('date_saved').notNull()
// });

// // Following table - for users following other users/vendors
// export const following = pgTable('following', {
// 	id: text('id').primaryKey(),
// 	followerId: text('follower_id')
// 		.notNull()
// 		.references(() => user.id),
// 	followingId: text('following_id').notNull(),
// 	followingType: text('following_type').notNull(), // 'user' or 'vendor'
// 	dateFollowed: timestamp('date_followed').notNull()
// });

// // Active projects table - for ongoing projects
// export const activeProjects = pgTable('active_projects', {
// 	id: text('id').primaryKey(),
// 	title: text('title').notNull(),
// 	description: text('description'),
// 	clientId: text('client_id')
// 		.notNull()
// 		.references(() => user.id),
// 	vendorId: text('vendor_id'),
// 	budget: text('budget'),
// 	status: text('status').notNull(),
// 	startDate: timestamp('start_date'),
// 	expectedEndDate: timestamp('expected_end_date'),
// 	location: text('location'),
// 	tags: json('tags'),
// 	requirements: json('requirements')
// });

// // Completed projects table - for finished projects
// export const completedProjects = pgTable('completed_projects', {
// 	id: text('id').primaryKey(),
// 	title: text('title').notNull(),
// 	description: text('description'),
// 	clientId: text('client_id')
// 		.notNull()
// 		.references(() => user.id),
// 	vendorId: text('vendor_id'),
// 	budget: text('budget'),
// 	status: text('status').notNull(),
// 	startDate: timestamp('start_date'),
// 	completedDate: timestamp('completed_date'),
// 	location: text('location'),
// 	tags: json('tags'),
// 	clientReview: text('client_review'),
// 	clientRating: integer('client_rating'),
// 	vendorReview: text('vendor_review'),
// 	vendorRating: integer('vendor_rating')
// });

// // Wallet table - for user/vendor financial accounts
// export const wallets = pgTable('wallets', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	balance: text('balance').notNull(),
// 	currency: text('currency').notNull(),
// 	lastUpdated: timestamp('last_updated').notNull()
// });

// // Financial transactions
// export const financialTransactions = pgTable('financial_transactions', {
// 	id: text('id').primaryKey(),
// 	walletId: text('wallet_id')
// 		.notNull()
// 		.references(() => wallets.id),
// 	transactionType: text('transaction_type').notNull(), // 'deposit', 'withdrawal', 'payment', etc.
// 	amount: text('amount').notNull(),
// 	currency: text('currency').notNull(),
// 	description: text('description'),
// 	status: text('status').notNull(),
// 	createdAt: timestamp('created_at').notNull(),
// 	completedAt: timestamp('completed_at')
// });

// // Wallet transactions - for payment/transfers between wallets
// export const walletTransactions = pgTable('wallet_transactions', {
// 	id: text('id').primaryKey(),
// 	senderWalletId: text('sender_wallet_id')
// 		.notNull()
// 		.references(() => wallets.id),
// 	receiverWalletId: text('receiver_wallet_id')
// 		.notNull()
// 		.references(() => wallets.id),
// 	amount: text('amount').notNull(),
// 	currency: text('currency').notNull(),
// 	status: text('status').notNull(),
// 	description: text('description'),
// 	projectId: text('project_id'),
// 	createdAt: timestamp('created_at').notNull(),
// 	completedAt: timestamp('completed_at')
// });

// // Financial statistics table
// export const financialStats = pgTable('financial_stats', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	totalEarned: text('total_earned').notNull(),
// 	totalSpent: text('total_spent').notNull(),
// 	averageProjectValue: text('average_project_value'),
// 	currency: text('currency').notNull(),
// 	lastUpdated: timestamp('last_updated').notNull()
// });
