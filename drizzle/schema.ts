import { pgTable, bigint, text, char, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const listings = pgTable("listings", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	listingId: bigint("listing_id", { mode: "number" }).primaryKey().notNull(),
	name: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	loc: bigint({ mode: "number" }).array(),
	owner: char(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	price: bigint({ mode: "number" }),
	dateListed: date("date_listed"),
	field: text().array(),
	description: text(),
});

export const user = pgTable("user", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).primaryKey().notNull(),
	username: text(),
	hash: text(),
	vendorLink: char("vendor_link"),
	userType: text("user_type").array(),
	listingAccsess: text("listing_accsess").array(),
	listings: text().array(),
	firstName: text("first_name"),
	surName: text("sur_name"),
	birthDate: date("birth_date"),
	dateJoined: date("date_joined"),
	field: text().array(),
});
