import { pgTable, foreignKey, check, text, timestamp, varchar, index, integer, boolean, date, real, unique, point, json, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const projectStatus = pgEnum("project_status", ['draft', 'posted', 'in_progress', 'completed', 'cancelled'])
export const transactionSource = pgEnum("transaction_source", ['wallets', 'direct'])
export const transactionType = pgEnum("transaction_type", ['incoming', 'outgoing'])
export const userRole = pgEnum("user_role", ['business', 'private', 'government'])
export const userType = pgEnum("user_type", ['vendor', 'client'])


export const favoriteProjects = pgTable("favorite_projects", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	projectId: text("project_id").notNull(),
	dateSaved: timestamp("date_saved", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	url: varchar({ length: 2048 }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "favorite_projects_user_id_fkey"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "favorite_projects_project_id_fkey"
		}),
	check("favorite_projects_url_check", sql`(url)::text ~* '^https?://(www\.)?oppdragsmarkedet\.no/oppdrag/\?prosjekt_id=p[^\s]*$'::text`),
]);

export const savedFilters = pgTable("saved_filters", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	saveName: text("save_name"),
	url: varchar({ length: 2048 }),
	dateSaved: timestamp("date_saved", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "saved_filters_user_id_fkey"
		}),
	check("saved_filters_url_check", sql`(url)::text ~* '^https?://(www\.)?oppdragsmarkedet\.no(/.*)?$'::text`),
]);

export const followedClients = pgTable("followed_clients", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	clientId: text("client_id").notNull(),
	dateSaved: timestamp("date_saved", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "followed_clients_user_id_fkey"
		}),
	foreignKey({
			columns: [table.clientId],
			foreignColumns: [users.id],
			name: "followed_clients_client_id_fkey"
		}),
]);

export const wallets = pgTable("wallets", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	balance: integer().default(0),
	currency: text().default('NOK'),
	isBalanceValid: boolean("is_balance_valid").default(true),
}, (table) => [
	index("idx_wallets_user_id").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "wallets_user_id_fkey"
		}),
]);

export const financialTransactions = pgTable("financial_transactions", {
	id: text().primaryKey().notNull(),
	walletId: text("wallet_id").notNull(),
	userId: text("user_id").notNull(),
	transactionType: text("transaction_type").notNull(),
	amount: integer().notNull(),
	currency: text().default('NOK'),
	description: text(),
	status: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	completedAt: timestamp("completed_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.walletId],
			foreignColumns: [wallets.id],
			name: "financial_transactions_wallet_id_fkey"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "financial_transactions_user_id_fkey"
		}),
]);

export const walletTransactions = pgTable("wallet_transactions", {
	id: text().primaryKey().notNull(),
	senderWalletId: text("sender_wallet_id").notNull(),
	receiverWalletId: text("receiver_wallet_id").notNull(),
	senderId: text("sender_id").notNull(),
	receiverId: text("receiver_id").notNull(),
	amount: integer().notNull(),
	currency: text().default('NOK'),
	status: text().notNull(),
	description: text(),
	projectId: text("project_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	completedAt: timestamp("completed_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.senderWalletId],
			foreignColumns: [wallets.id],
			name: "wallet_transactions_sender_wallet_id_fkey"
		}),
	foreignKey({
			columns: [table.receiverWalletId],
			foreignColumns: [wallets.id],
			name: "wallet_transactions_receiver_wallet_id_fkey"
		}),
	foreignKey({
			columns: [table.senderId],
			foreignColumns: [users.id],
			name: "wallet_transactions_sender_id_fkey"
		}),
	foreignKey({
			columns: [table.receiverId],
			foreignColumns: [users.id],
			name: "wallet_transactions_receiver_id_fkey"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "wallet_transactions_project_id_fkey"
		}),
]);

export const userProfiles = pgTable("user_profiles", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	phone: varchar({ length: 20 }),
	birthDate: date("birth_date"),
	profileImage: text("profile_image"),
	clientReviewsRating: real("client_reviews_rating"),
	clientReviewsCount: integer("client_reviews_count").default(0),
	verifiedUser: boolean("verified_user").default(false),
	verifiedPayment: boolean("verified_payment").default(false),
	choice: boolean().default(false),
	longTimeUser: boolean("long_time_user").default(false),
	fastReplyer: boolean("fast_replyer").default(false),
	slowReplyer: boolean("slow_replyer").default(false),
	givenComplaints: boolean("given_complaints").default(false),
	receivedComplaints: boolean("received_complaints").default(false),
	insurance: boolean().default(false),
	paymentInsurance: boolean("payment_insurance").default(false),
	fastWorker: boolean("fast_worker").default(false),
	slowWorker: boolean("slow_worker").default(false),
}, (table) => [
	index("idx_profiles_user_id").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_profiles_user_id_fkey"
		}),
	check("user_profiles_first_name_check", sql`((first_name)::text ~ '^\p{L}+(?:[\s-]\p{L}+)*$'::text) AND ((length((first_name)::text) >= 1) AND (length((first_name)::text) <= 100))`),
	check("user_profiles_last_name_check", sql`((last_name)::text ~ '^\p{L}+(?:[\s-]\p{L}+)*$'::text) AND ((length((last_name)::text) >= 1) AND (length((last_name)::text) <= 100))`),
	check("user_profiles_phone_check", sql`((phone)::text ~ '^\+[1-9]\d{1,3}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$'::text) AND ((length((phone)::text) >= 5) AND (length((phone)::text) <= 20))`),
	check("user_profiles_birth_date_check", sql`(birth_date >= '1900-01-01'::date) AND (birth_date <= (CURRENT_DATE - '13 years'::interval))`),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	username: varchar({ length: 50 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	email: varchar({ length: 319 }).notNull(),
	userType: userType("user_type").notNull(),
	userRole: userRole("user_role").notNull(),
	dateJoined: timestamp("date_joined", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	lastLogin: timestamp("last_login", { mode: 'string' }),
	isActive: boolean("is_active").default(true),
	isOnline: boolean("is_online").default(false),
	isEmailVerified: boolean("is_email_verified").default(false),
	isPhoneVerified: boolean("is_phone_verified").default(false),
	location: text(),
	locationData: point("location_data"),
}, (table) => [
	unique("users_username_key").on(table.username),
	unique("users_email_key").on(table.email),
	check("users_username_check", sql`(length((username)::text) >= 3) AND ((username)::text ~ '^[a-zA-Z0-9_]+$'::text)`),
	check("users_email_check", sql`(email)::text ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'::text`),
]);

export const sessions = pgTable("sessions", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	index("idx_sessions_user_id").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_fkey"
		}),
]);

export const projects = pgTable("projects", {
	id: text().primaryKey().notNull(),
	clientId: text("client_id").notNull(),
	vendorId: text("vendor_id"),
	title: text().notNull(),
	shortDescription: text("short_description"),
	longDescription: text("long_description"),
	location: text(),
	address: text(),
	category: json(),
	experienceRequirements: json("experience_requirements"),
	jobAttributes: json("job_attributes"),
	postDate: timestamp("post_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	startDate: timestamp("start_date", { mode: 'string' }),
	dueDate: timestamp("due_date", { mode: 'string' }),
	finishDate: timestamp("finish_date", { mode: 'string' }),
	estimatedTime: text("estimated_time"),
	budget: integer(),
	currency: text().default('NOK'),
	paymentVerification: boolean("payment_verification").default(false),
	status: projectStatus().default('draft'),
	favoritedCount: integer("favorited_count").default(0),
	viewCount: integer("view_count").default(0),
	purchaseCount: integer("purchase_count").default(0),
	paidListing: boolean("paid_listing").default(false),
	listingPriorityScore: integer("listing_priority_score").default(0),
	vendorRating: integer("vendor_rating"),
	clientRating: integer("client_rating"),
}, (table) => [
	index("idx_projects_client_id").using("btree", table.clientId.asc().nullsLast().op("text_ops")),
	index("idx_projects_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("idx_projects_vendor_id").using("btree", table.vendorId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.clientId],
			foreignColumns: [users.id],
			name: "projects_client_id_fkey"
		}),
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [users.id],
			name: "projects_vendor_id_fkey"
		}),
]);

export const vendorProfiles = pgTable("vendor_profiles", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	// TODO: failed to parse database type 'org_number'
	orgNumber: unknown("org_number").notNull(),
	companyName: text("company_name"),
	fieldsOfWork: json("fields_of_work"),
	specializations: json(),
	certificates: json(),
	description: text(),
	logo: varchar({ length: 2048 }),
	orgValidatedAt: timestamp("org_validated_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("idx_vendor_profiles_user_id").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	index("org_number_idx").using("btree", table.orgNumber.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vendor_profiles_user_id_fkey"
		}),
	unique("vendor_profiles_org_number_key").on(table.orgNumber),
	check("vendor_profiles_logo_check", sql`((logo)::text ~* '^https?://[^\s/$.?#].[^\s]*$'::text) AND ((logo)::text ~* '\.(jpe?g|png|gif|webp|avif|svg)$'::text)`),
]);

export const socialMedia = pgTable("social_media", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	facebook: varchar({ length: 2048 }),
	tiktok: varchar({ length: 2048 }),
	linkedin: varchar({ length: 2048 }),
	twitter: varchar({ length: 2048 }),
	instagram: varchar({ length: 2048 }),
	homepage: varchar({ length: 2048 }),
	proff: varchar({ length: 2048 }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "social_media_user_id_fkey"
		}),
	check("social_media_facebook_check", sql`(facebook)::text ~* '^https?://(www\.)?facebook\.com(/.*)?$'::text`),
	check("social_media_tiktok_check", sql`(tiktok)::text ~* '^https?://(www\.)?tiktok\.com(/.*)?$'::text`),
	check("social_media_linkedin_check", sql`(linkedin)::text ~* '^https?://(www\.)?linkedin\.com(/.*)?$'::text`),
	check("social_media_twitter_check", sql`(twitter)::text ~* '^https?://(www\.)?twitter\.com(/.*)?$'::text`),
	check("social_media_instagram_check", sql`(instagram)::text ~* '^https?://(www\.)?instagram\.com(/.*)?$'::text`),
	check("social_media_homepage_check", sql`(homepage)::text ~* '^https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}(/.*)?$'::text`),
	check("social_media_proff_check", sql`(proff)::text ~* '^https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}(/.*)?$'::text`),
]);

export const financialStats = pgTable("financial_stats", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	totalEarned: integer("total_earned").default(0),
	totalSpent: integer("total_spent").default(0),
	averageProjectValue: integer("average_project_value"),
	currency: text().default('NOK'),
	lastUpdated: timestamp("last_updated", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	timeEfficiency: integer("time_efficiency"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "financial_stats_user_id_fkey"
		}),
]);
