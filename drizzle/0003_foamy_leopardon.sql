CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"secret_hash" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_provider_providerAccountId_pk";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password_hash" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password_hash" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "user_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "user_role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "google_id" text;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_google_id_unique" UNIQUE("google_id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");