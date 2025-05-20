export * from './ignore/schema-extensions';

// import { float } from 'drizzle-orm/mysql-core';
import {
	real,
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
	json,
	point,
	pgEnum,
	varchar,
	date
} from 'drizzle-orm/pg-core';

// ========================
// ENUMS
// ========================

// Project status enum for better type safety
export const projectStatusEnum = pgEnum('project_status', [
	'draft',
	'posted',
	'in_progress',
	'completed',
	'cancelled'
]);

// Transaction source enum
export const transactionSourceEnum = pgEnum('transaction_source', ['wallets', 'direct']);

// Transaction type enum
export const transactionTypeEnum = pgEnum('transaction_type', ['incoming', 'outgoing']);

// User type enum
export const userTypeEnum = pgEnum('user_type', ['vendor', 'client']);

// User role enum
export const userRoleEnum = pgEnum('user_role', ['business', 'private', 'government']);

// ========================
// SESSION
// ========================

export const session = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// ========================
// CORE TABLES
// ========================

// User table - core user information
export const users = pgTable('users', {
	id: text('id').primaryKey(), // e.g., 'u10000023cp'
	username: varchar('username', { length: 50 }).notNull().unique(),
	password_hash: varchar('password_hash', { length: 255 }).notNull(),
	email: varchar('email', { length: 319 }).notNull().unique(),
	user_type: userTypeEnum('user_type').notNull(), // 'vendor' or 'client'
	user_role: userRoleEnum('user_role').notNull(), // 'business', 'private', 'government'
	date_joined: timestamp('date_joined').defaultNow(),
	last_login: timestamp('last_login'),
	is_active: boolean('is_active').default(true),
	is_online: boolean('is_online').default(false),
	is_email_verified: boolean('is_email_verified').default(false),
	is_phone_verified: boolean('is_phone_verified').default(false),
	location: text('location'),
	location_data: point('location_data')
});

// User profile data - personal information
export const user_profiles = pgTable('user_profiles', {
	id: text('id').primaryKey(), // e.g., 'p20000023cp'
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	first_name: varchar('first_name', { length: 100 }).notNull(),
	last_name: varchar('last_name', { length: 100 }).notNull(),
	birth_date: date('birth_date'),
	phone: varchar('phone', { length: 20 }),
	profile_image: text('profile_image'),

	// Ratings
	client_reviews_rating: real('client_reviews_rating').default(0),
	client_reviews_count: integer('client_reviews_count').default(0),

	// Profile tags - explicit columns for better filtering
	verified_user: boolean('verified_user').default(false),
	verified_payment: boolean('verified_payment').default(false),
	choice: boolean('choice').default(false),
	long_time_user: boolean('long_time_user').default(false),
	fast_replyer: boolean('fast_replyer').default(false),
	slow_replyer: boolean('slow_replyer').default(false),
	given_complaints: boolean('given_complaints').default(false),
	received_complaints: boolean('received_complaints').default(false),
	insurance: boolean('insurance').default(false),
	payment_insurance: boolean('payment_insurance').default(false),
	fast_worker: boolean('fast_worker').default(false),
	slow_worker: boolean('slow_worker').default(false)
});

// Consolidated projects table - single source of truth for all project data
export const projects = pgTable('projects', {
	// Basic identification
	id: text('id').primaryKey(), // e.g., 'proj0020019'
	client_id: text('client_id')
		.notNull()
		.references(() => users.id),
	vendor_id: text('vendor_id').references(() => users.id), // Can be null until assigned

	// Project details
	title: text('title').notNull(),
	short_description: text('short_description'),
	long_description: text('long_description'),

	// Location information
	location: text('location'),
	address: text('address'),

	// Categorization
	category: json('category'), // ['rørlegger', 'renovation']
	experience_requirements: json('experience_requirements'), // ['fliselegging', 'betong']
	job_attributes: json('job_attributes'), // ['trapp', 'innejobb', 'enmannsjobb']

	// Time tracking
	post_date: timestamp('post_date').defaultNow(),
	start_date: timestamp('start_date'),
	due_date: timestamp('due_date'),
	finish_date: timestamp('finish_date'),
	estimated_time: text('estimated_time'), // '00M:00W:14D:00h:00m'

	// Financial details
	budget: integer('budget'),
	currency: text('currency').default('NOK'),
	payment_verification: boolean('payment_verification').default(false),

	// Status and metrics
	status: projectStatusEnum('status').default('draft'),
	favorited_count: integer('favorited_count').default(0),
	view_count: integer('view_count').default(0),
	purchase_count: integer('purchase_count').default(0),
	paid_listing: boolean('paid_listing').default(false),
	listing_priority_score: integer('listing_priority_score').default(0),

	// Ratings (when project is completed)
	vendor_rating: integer('vendor_rating'),
	client_rating: integer('client_rating')
});

// ========================
// VENDOR EXTENSION TABLES
// ========================

// Vendor profile extensions - business-specific information
export const vendorProfiles = pgTable('vendor_profiles', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	company_name: text('company_name'),
	org_number: varchar('org_number', { length: 9 }).notNull().unique(),
	fields_of_work: json('fields_of_work'),
	specializations: json('specializations'),
	certificates: json('certificates'),
	description: text('description'),
	logo: varchar('logo', { length: 2048 }),
	org_validated_at: timestamp('org_validated_at', { withTimezone: true })
});

// Social media links for vendors
export const socialMedia = pgTable('social_media', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	facebook: varchar('facebook', { length: 2048 }),
	tiktok: varchar('tiktok', { length: 2048 }),
	linkedin: varchar('linkedin', { length: 2048 }),
	twitter: varchar('twitter', { length: 2048 }),
	instagram: varchar('instagram', { length: 2048 }),
	homepage: varchar('homepage', { length: 2048 }),
	proff: varchar('proff', { length: 2048 })
});

// ========================
// PROJECT INTERACTION TABLES
// ========================

// Project favorites (normalized from the JSON arrays)
export const favoriteProjects = pgTable('favorite_projects', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	project_id: text('project_id')
		.notNull()
		.references(() => projects.id),
	date_saved: timestamp('date_saved').defaultNow(),
	url: varchar('url', { length: 2048 })
});

// Saved search filters
export const savedFilters = pgTable('saved_filters', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	save_name: text('save_name'),
	url: varchar('url', { length: 2048 }),
	date_saved: timestamp('date_saved').defaultNow()
});

// Followed clients
export const followedClients = pgTable('followed_clients', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	client_id: text('client_id')
		.notNull()
		.references(() => users.id),
	date_saved: timestamp('date_saved').defaultNow()
});

// ========================
// FINANCIAL TABLES
// ========================

// Wallet information
export const wallets = pgTable('wallets', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	balance: integer('balance').default(0),
	currency: text('currency').default('NOK'),
	is_balance_valid: boolean('is_balance_valid').default(true)
});

// Financial transactions
export const financialTransactions = pgTable('financial_transactions', {
	id: text('id').primaryKey(),
	wallet_id: text('wallet_id')
		.notNull()
		.references(() => wallets.id),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id), // for faster queries
	transaction_type: transactionTypeEnum('transaction_type').notNull(), // 'incoming', 'outgoing'
	amount: integer('amount').notNull(),
	currency: text('currency').default('NOK'),
	description: text('description'),
	status: text('status').notNull(), // 'pending', 'completed', 'failed'
	created_at: timestamp('created_at').defaultNow(),
	completed_at: timestamp('completed_at')
});

// Wallet transactions (between wallets)
export const walletTransactions = pgTable('wallet_transactions', {
	id: text('id').primaryKey(),
	sender_wallet_id: text('sender_wallet_id')
		.notNull()
		.references(() => wallets.id),
	receiver_wallet_id: text('receiver_wallet_id')
		.notNull()
		.references(() => wallets.id),
	sender_id: text('sender_id')
		.notNull()
		.references(() => users.id),
	receiver_id: text('receiver_id')
		.notNull()
		.references(() => users.id),
	amount: integer('amount').notNull(),
	currency: text('currency').default('NOK'),
	status: text('status').notNull(),
	description: text('description'),
	project_id: text('project_id').references(() => projects.id),
	created_at: timestamp('created_at').defaultNow(),
	completed_at: timestamp('completed_at')
});

// Financial statistics
export const financialStats = pgTable('financial_stats', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id),
	total_earned: integer('total_earned').default(0),
	total_spent: integer('total_spent').default(0),
	average_project_value: integer('average_project_value'),
	currency: text('currency').default('NOK'),
	last_updated: timestamp('last_updated').defaultNow(),
	time_efficiency: integer('time_efficiency')
});

// ========================
// RELATIONSHIPS
// ========================

// Relations are defined in a separate file to avoid TypeScript errors
// Import them from ./relations.js

// ========================
// EXAMPLE QUERY FUNCTIONS
// ========================

/*
// Get project with client and vendor info
export const getProjectWithDetails = async (db, projectId) => {
  return db.select({
    project: projects,
    client: {
      user: users,
      profile: user_profiles
    },
    vendor: {
      user: users,
      profile: user_profiles,
      vendorInfo: vendorProfiles
    }
  })
  .from(projects)
  .where(eq(projects.id, projectId))
  .leftJoin(users, eq(projects.client_id, users.id))
  .leftJoin(user_profiles, eq(users.id, user_profiles.user_id))
  .leftJoin(users, eq(projects.vendor_id, users.id))
  .leftJoin(user_profiles, eq(users.id, user_profiles.user_id))
  .leftJoin(vendorProfiles, eq(users.id, vendorProfiles.user_id));
};

// Get all active projects for a vendor
export const getVendorActiveProjects = async (db, vendorId) => {
  return db.select()
    .from(projects)
    .where(
      and(
        eq(projects.vendor_id, vendorId),
        eq(projects.status, 'in_progress')
      )
    );
};

// Get a vendor's financial summary
export const getVendorFinancialSummary = async (db, vendorId) => {
  return db.select()
    .from(financialStats)
    .where(eq(financialStats.user_id, vendorId));
};
*/
