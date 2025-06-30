CREATE TYPE "public"."project_status" AS ENUM('draft', 'posted', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."transaction_source" AS ENUM('wallets', 'direct');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('incoming', 'outgoing');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('private', 'business', 'government', 'employee', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('vendor', 'client', 'employee', 'admin');--> statement-breakpoint
CREATE TABLE "accounts" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "favorite_projects" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"project_id" text NOT NULL,
	"date_saved" timestamp DEFAULT CURRENT_TIMESTAMP,
	"url" varchar(2048),
	CONSTRAINT "favorite_projects_url_check" CHECK ((url)::text ~* '^https?://(www.)?oppdragsmarkedet.no/oppdrag/?prosjekt_id=pro[^s]*$'::text)
);
--> statement-breakpoint
CREATE TABLE "financial_stats" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"total_earned" integer DEFAULT 0,
	"total_spent" integer DEFAULT 0,
	"average_project_value" integer,
	"currency" text DEFAULT 'NOK',
	"last_updated" timestamp DEFAULT CURRENT_TIMESTAMP,
	"time_efficiency" integer
);
--> statement-breakpoint
CREATE TABLE "financial_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"wallet_id" text NOT NULL,
	"user_id" text NOT NULL,
	"transaction_type" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'NOK',
	"description" text,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "followed_clients" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"client_id" text NOT NULL,
	"date_saved" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "oauth_sessions" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"vendor_id" text,
	"title" text NOT NULL,
	"short_description" text,
	"long_description" text,
	"location" text,
	"address" text,
	"client_role" varchar(10),
	"category" varchar(40),
	"sub_category" varchar(40),
	"experience_requirements" varchar(50)[],
	"job_attributes" varchar(50)[],
	"thumbnail" varchar(250),
	"image_gallery" varchar(250)[],
	"post_date" timestamp DEFAULT CURRENT_TIMESTAMP,
	"start_date" timestamp,
	"due_date" timestamp,
	"finish_date" timestamp,
	"estimated_time" text,
	"budget" integer,
	"currency" text DEFAULT 'NOK',
	"payment_verification" boolean DEFAULT false,
	"state" "project_status" DEFAULT 'draft',
	"is_active" boolean DEFAULT true,
	"favorited_count" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"purchase_count" integer DEFAULT 0,
	"paid_listing" boolean DEFAULT false,
	"listing_priority_score" integer DEFAULT 0,
	"vendor_rating" integer,
	"client_rating" integer
);
--> statement-breakpoint
CREATE TABLE "saved_filters" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"save_name" text,
	"url" varchar(2048),
	"date_saved" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "saved_filters_url_check" CHECK ((url)::text ~* '^https?://(www.)?oppdragsmarkedet.no(/.*)?$'::text)
);
--> statement-breakpoint
CREATE TABLE "social_media" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"facebook" varchar(2048),
	"tiktok" varchar(2048),
	"linkedin" varchar(2048),
	"twitter" varchar(2048),
	"instagram" varchar(2048),
	"homepage" varchar(2048),
	"proff" varchar(2048),
	CONSTRAINT "social_media_facebook_check" CHECK ((facebook)::text ~* '^https?://(www.)?facebook.com(/.*)?$'::text),
	CONSTRAINT "social_media_tiktok_check" CHECK ((tiktok)::text ~* '^https?://(www.)?tiktok.com(/.*)?$'::text),
	CONSTRAINT "social_media_linkedin_check" CHECK ((linkedin)::text ~* '^https?://(www.)?linkedin.com(/.*)?$'::text),
	CONSTRAINT "social_media_twitter_check" CHECK ((twitter)::text ~* '^https?://(www.)?twitter.com(/.*)?$'::text),
	CONSTRAINT "social_media_instagram_check" CHECK ((instagram)::text ~* '^https?://(www.)?instagram.com(/.*)?$'::text),
	CONSTRAINT "social_media_homepage_check" CHECK ((homepage)::text ~* '^https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z]{2,6}(/.*)?$'::text),
	CONSTRAINT "social_media_proff_check" CHECK ((proff)::text ~* '^https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z]{2,6}(/.*)?$'::text)
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"email" varchar(254) NOT NULL,
	"birth_date" date NOT NULL,
	"profile_image" varchar(250),
	"client_reviews_rating" real NOT NULL,
	"client_reviews_count" integer DEFAULT 0 NOT NULL,
	"address" varchar(250) NOT NULL,
	"verified_user" boolean DEFAULT false,
	"verified_payment" boolean DEFAULT false,
	"choice" boolean DEFAULT false,
	"long_time_user" boolean DEFAULT false,
	"fast_replyer" boolean DEFAULT false,
	"slow_replyer" boolean DEFAULT false,
	"given_complaints" boolean DEFAULT false,
	"received_complaints" boolean DEFAULT false,
	"insurance" boolean DEFAULT false,
	"payment_insurance" boolean DEFAULT false,
	"fast_worker" boolean DEFAULT false,
	"slow_worker" boolean DEFAULT false,
	CONSTRAINT "user_profiles_id_unique" UNIQUE("id"),
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "user_profiles_phone_unique" UNIQUE("phone"),
	CONSTRAINT "user_profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" varchar(319) NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"username" varchar(50),
	"password_hash" varchar(255),
	"user_type" "user_type",
	"user_role" "user_role",
	"date_joined" timestamp DEFAULT CURRENT_TIMESTAMP,
	"last_login" timestamp,
	"is_active" boolean DEFAULT true,
	"is_online" boolean DEFAULT false,
	"is_email_verified" boolean DEFAULT false,
	"is_phone_verified" boolean DEFAULT false,
	"is_third_party_verified" boolean DEFAULT false,
	"location" text,
	"location_data" "point",
	CONSTRAINT "users_username_key" UNIQUE("username"),
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_username_check" CHECK ((length((username)::text) >= 3) AND ((username)::text ~ '^[a-zA-Z0-9_]+$'::text)),
	CONSTRAINT "users_email_check" CHECK ((email)::text ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$'::text)
);
--> statement-breakpoint
CREATE TABLE "vendor_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"orgNumber" varchar(9) NOT NULL,
	"company_name" text,
	"fields_of_work" json,
	"specializations" json,
	"certificates" json,
	"description" text,
	"logo" varchar(2048),
	"org_validated_at" timestamp with time zone,
	CONSTRAINT "vendor_profiles_org_number_key" UNIQUE("orgNumber"),
	CONSTRAINT "vendor_profiles_logo_check" CHECK (((logo)::text ~* '^https?://[^s/$.?#].[^s]*$'::text) AND ((logo)::text ~* '.(jpe?g|png|gif|webp|avif|svg)$'::text))
);
--> statement-breakpoint
CREATE TABLE "verificationtokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_tokens_identifier_token_key" UNIQUE("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "wallet_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"sender_wallet_id" text NOT NULL,
	"receiver_wallet_id" text NOT NULL,
	"sender_id" text NOT NULL,
	"receiver_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'NOK',
	"status" text NOT NULL,
	"description" text,
	"project_id" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"balance" integer DEFAULT 0,
	"currency" text DEFAULT 'NOK',
	"is_balance_valid" boolean DEFAULT true
);
--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_projects" ADD CONSTRAINT "favorite_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_projects" ADD CONSTRAINT "favorite_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_stats" ADD CONSTRAINT "financial_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transactions" ADD CONSTRAINT "financial_transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transactions" ADD CONSTRAINT "financial_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followed_clients" ADD CONSTRAINT "followed_clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followed_clients" ADD CONSTRAINT "followed_clients_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_sessions" ADD CONSTRAINT "oauth_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_filters" ADD CONSTRAINT "saved_filters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_profiles" ADD CONSTRAINT "vendor_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_sender_wallet_id_fkey" FOREIGN KEY ("sender_wallet_id") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_receiver_wallet_id_fkey" FOREIGN KEY ("receiver_wallet_id") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_projects_client_id" ON "projects" USING btree ("client_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_projects_state" ON "projects" USING btree ("state" enum_ops);--> statement-breakpoint
CREATE INDEX "idx_projects_vendor_id" ON "projects" USING btree ("vendor_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_profiles_user_id" ON "user_profiles" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_vendor_profiles_user_id" ON "vendor_profiles" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "org_number_idx" ON "vendor_profiles" USING btree ("orgNumber" text_ops);--> statement-breakpoint
CREATE INDEX "idx_wallets_user_id" ON "wallets" USING btree ("user_id" text_ops);