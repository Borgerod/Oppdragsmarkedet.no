// import { relations } from 'drizzle-orm';
// import {
// 	users,
// 	profiles,
// 	projects,
// 	vendorProfiles,
// 	socialMedia,
// 	wallets,
// 	financialStats,
// 	projectFavorites,
// 	savedFilters,
// 	followedClients,
// 	walletTransactions
// } from '../optimized_schema_v2';

// /**
//  * Relations for Drizzle ORM 0.40.0
//  *
//  * This file contains the correct format for relations using the latest version of Drizzle ORM.
//  * The syntax here is compatible with the current version and fixes the TypeScript errors.
//  */

// export const usersRelations = relations(users, ({ one, many }) => ({
// 	profile: one(profiles, {
// 		relationName: 'userProfile',
// 		fields: [users.id],
// 		references: [profiles.user_id]
// 	}),
// 	vendorProfile: one(vendorProfiles, {
// 		relationName: 'userVendorProfile',
// 		fields: [users.id],
// 		references: [vendorProfiles.user_id]
// 	}),
// 	socialMedia: one(socialMedia, {
// 		relationName: 'userSocialMedia',
// 		fields: [users.id],
// 		references: [socialMedia.user_id]
// 	}),
// 	wallet: one(wallets, {
// 		relationName: 'userWallet',
// 		fields: [users.id],
// 		references: [wallets.user_id]
// 	}),
// 	financialStats: one(financialStats, {
// 		relationName: 'userFinancialStats',
// 		fields: [users.id],
// 		references: [financialStats.user_id]
// 	}),
// 	clientProjects: many(projects, {
// 		relationName: 'clientProjects',
// 		fields: [users.id],
// 		references: [projects.client_id]
// 	}),
// 	vendorProjects: many(projects, {
// 		relationName: 'vendorProjects',
// 		fields: [users.id],
// 		references: [projects.vendor_id]
// 	}),
// 	savedFilters: many(savedFilters, {
// 		relationName: 'userSavedFilters',
// 		fields: [users.id],
// 		references: [savedFilters.user_id]
// 	}),
// 	following: many(followedClients, {
// 		relationName: 'userFollowing',
// 		fields: [users.id],
// 		references: [followedClients.user_id]
// 	}),
// 	followers: many(followedClients, {
// 		relationName: 'userFollowers',
// 		fields: [users.id],
// 		references: [followedClients.client_id]
// 	}),
// 	favoritedProjects: many(projectFavorites, {
// 		relationName: 'userFavorites',
// 		fields: [users.id],
// 		references: [projectFavorites.user_id]
// 	})
// }));

// export const profilesRelations = relations(profiles, ({ one }) => ({
// 	user: one(users, {
// 		relationName: 'userProfile',
// 		fields: [profiles.user_id],
// 		references: [users.id]
// 	})
// }));

// export const projectsRelations = relations(projects, ({ one, many }) => ({
// 	client: one(users, {
// 		relationName: 'clientProjects',
// 		fields: [projects.client_id],
// 		references: [users.id]
// 	}),
// 	vendor: one(users, {
// 		relationName: 'vendorProjects',
// 		fields: [projects.vendor_id],
// 		references: [users.id]
// 	}),
// 	favorited: many(projectFavorites, {
// 		relationName: 'projectFavorites',
// 		fields: [projects.id],
// 		references: [projectFavorites.project_id]
// 	}),
// 	transactions: many(walletTransactions, {
// 		relationName: 'projectTransactions',
// 		fields: [projects.id],
// 		references: [walletTransactions.project_id]
// 	})
// }));

// export const vendorProfilesRelations = relations(vendorProfiles, ({ one }) => ({
// 	user: one(users, {
// 		relationName: 'userVendorProfile',
// 		fields: [vendorProfiles.user_id],
// 		references: [users.id]
// 	})
// }));

// export const socialMediaRelations = relations(socialMedia, ({ one }) => ({
// 	user: one(users, {
// 		relationName: 'userSocialMedia',
// 		fields: [socialMedia.user_id],
// 		references: [users.id]
// 	})
// }));

// export const walletsRelations = relations(wallets, ({ one }) => ({
// 	user: one(users, {
// 		relationName: 'userWallet',
// 		fields: [wallets.user_id],
// 		references: [users.id]
// 	})
// }));

// export const financialStatsRelations = relations(financialStats, ({ one }) => ({
// 	user: one(users, {
// 		relationName: 'userFinancialStats',
// 		fields: [financialStats.user_id],
// 		references: [users.id]
// 	})
// }));

// export const projectFavoritesRelations = relations(projectFavorites, ({ one }) => ({
// 	user: one(users, {
// 		relationName: 'userFavorites',
// 		fields: [projectFavorites.user_id],
// 		references: [users.id]
// 	}),
// 	project: one(projects, {
// 		relationName: 'projectFavorites',
// 		fields: [projectFavorites.project_id],
// 		references: [projects.id]
// 	})
// }));

// export const savedFiltersRelations = relations(savedFilters, ({ one }) => ({
// 	user: one(users, {
// 		relationName: 'userSavedFilters',
// 		fields: [savedFilters.user_id],
// 		references: [users.id]
// 	})
// }));

// export const followedClientsRelations = relations(followedClients, ({ one }) => ({
// 	follower: one(users, {
// 		relationName: 'userFollowing',
// 		fields: [followedClients.user_id],
// 		references: [users.id]
// 	}),
// 	followed: one(users, {
// 		relationName: 'userFollowers',
// 		fields: [followedClients.client_id],
// 		references: [users.id]
// 	})
// }));

// export const walletTransactionsRelations = relations(walletTransactions, ({ one }) => ({
// 	project: one(projects, {
// 		relationName: 'projectTransactions',
// 		fields: [walletTransactions.project_id],
// 		references: [projects.id]
// 	})
// }));
