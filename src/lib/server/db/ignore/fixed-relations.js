import { relations } from 'drizzle-orm';
import {
	users,
	profiles,
	projects,
	vendorProfiles,
	socialMedia,
	wallets,
	financialStats,
	projectFavorites,
	savedFilters,
	followedClients,
	walletTransactions
} from '../optimized_schema_v2';

/**
 * Relations for Drizzle ORM 0.40.0
 *
 * This file contains the correct format for relations using the latest version of Drizzle ORM.
 * The syntax here is compatible with the current version and fixes the TypeScript errors.
 */

export const usersRelations = relations(users, ({ one, many }) => ({
	profile: one(profiles, { relationName: 'userProfile' }),
	vendorProfile: one(vendorProfiles, { relationName: 'userVendorProfile' }),
	socialMedia: one(socialMedia, { relationName: 'userSocialMedia' }),
	wallet: one(wallets, { relationName: 'userWallet' }),
	financialStats: one(financialStats, { relationName: 'userFinancialStats' }),
	clientProjects: many(projects, { relationName: 'clientProjects' }),
	vendorProjects: many(projects, { relationName: 'vendorProjects' }),
	savedFilters: many(savedFilters, { relationName: 'userSavedFilters' }),
	following: many(followedClients, { relationName: 'userFollowing' }),
	followers: many(followedClients, { relationName: 'userFollowers' }),
	favoritedProjects: many(projectFavorites, { relationName: 'userFavorites' })
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
	user: one(users, { relationName: 'userProfile' })
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
	client: one(users, { relationName: 'clientProjects' }),
	vendor: one(users, { relationName: 'vendorProjects' }),
	favorited: many(projectFavorites, { relationName: 'projectFavorites' }),
	transactions: many(walletTransactions, { relationName: 'projectTransactions' })
}));

export const vendorProfilesRelations = relations(vendorProfiles, ({ one }) => ({
	user: one(users, { relationName: 'userVendorProfile' })
}));

export const socialMediaRelations = relations(socialMedia, ({ one }) => ({
	user: one(users, { relationName: 'userSocialMedia' })
}));

export const walletsRelations = relations(wallets, ({ one }) => ({
	user: one(users, { relationName: 'userWallet' })
}));

export const financialStatsRelations = relations(financialStats, ({ one }) => ({
	user: one(users, { relationName: 'userFinancialStats' })
}));

export const projectFavoritesRelations = relations(projectFavorites, ({ one }) => ({
	user: one(users, { relationName: 'userFavorites' }),
	project: one(projects, { relationName: 'projectFavorites' })
}));

export const savedFiltersRelations = relations(savedFilters, ({ one }) => ({
	user: one(users, { relationName: 'userSavedFilters' })
}));

export const followedClientsRelations = relations(followedClients, ({ one }) => ({
	follower: one(users, { relationName: 'userFollowing' }),
	followed: one(users, { relationName: 'userFollowers' })
}));

export const walletTransactionsRelations = relations(walletTransactions, ({ one }) => ({
	project: one(projects, { relationName: 'projectTransactions' })
}));
