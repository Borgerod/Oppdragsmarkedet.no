import { relations } from 'drizzle-orm';
import {
	users,
	user_profiles,
	projects,
	vendorProfiles,
	socialMedia,
	wallets,
	financialStats,
	favoriteProjects,
	savedFilters,
	followedClients,
	walletTransactions,
	financialTransactions,
	session
} from './optimized_schema_v2';

/**
 * Relations for Drizzle ORM 0.40.1
 * This file contains correctly structured relations using the simpler syntax
 * without explicit fields/references that are causing TypeScript issues
 */

// Sessions relations
export const sessionRelations = relations(session, ({ one }) => ({
	user: one(users, { fields: [session.userId], references: [users.id] })
}));

// User relations
export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(session),
	projects: many(projects, { relationName: 'clientProjects' }),
	vendorProjects: many(projects, { relationName: 'vendorProjects' }),
	favoriteProjects: many(favoriteProjects),
	savedFilters: many(savedFilters),
	following: many(followedClients, { relationName: 'following' }),
	followers: many(followedClients, { relationName: 'followers' })
}));

// Profile relations
export const profilesRelations = relations(user_profiles, ({ one }) => ({
	user: one(users, { fields: [user_profiles.user_id], references: [users.id] })
}));

// Project relations
export const projectsRelations = relations(projects, ({ one, many }) => ({
	client: one(users, {
		fields: [projects.client_id],
		references: [users.id],
		relationName: 'clientProjects'
	}),
	vendor: one(users, {
		fields: [projects.vendor_id],
		references: [users.id],
		relationName: 'vendorProjects'
	}),
	favorited: many(favoriteProjects)
}));

// Vendor profile relations
export const vendorProfilesRelations = relations(vendorProfiles, ({ one }) => ({
	user: one(users, { fields: [vendorProfiles.user_id], references: [users.id] })
}));

// Social media relations
export const socialMediaRelations = relations(socialMedia, ({ one }) => ({
	user: one(users, { fields: [socialMedia.user_id], references: [users.id] })
}));

// Wallet relations
export const walletsRelations = relations(wallets, ({ one, many }) => ({
	user: one(users, { fields: [wallets.user_id], references: [users.id] }),
	transactions: many(financialTransactions),
	sentTransactions: many(walletTransactions, { relationName: 'sentTransactions' }),
	receivedTransactions: many(walletTransactions, { relationName: 'receivedTransactions' })
}));

// Financial stats relations
export const financialStatsRelations = relations(financialStats, ({ one }) => ({
	user: one(users, { fields: [financialStats.user_id], references: [users.id] })
}));

// Project favorites relations
export const favoriteProjectsRelations = relations(favoriteProjects, ({ one }) => ({
	user: one(users, { fields: [favoriteProjects.user_id], references: [users.id] }),
	project: one(projects, { fields: [favoriteProjects.project_id], references: [projects.id] })
}));

// Saved filters relations
export const savedFiltersRelations = relations(savedFilters, ({ one }) => ({
	user: one(users, { fields: [savedFilters.user_id], references: [users.id] })
}));

// Followed clients relations
export const followedClientsRelations = relations(followedClients, ({ one }) => ({
	follower: one(users, {
		fields: [followedClients.user_id],
		references: [users.id],
		relationName: 'following'
	}),
	followed: one(users, {
		fields: [followedClients.client_id],
		references: [users.id],
		relationName: 'followers'
	})
}));

// Financial transactions relations
export const financialTransactionsRelations = relations(financialTransactions, ({ one }) => ({
	wallet: one(wallets, { fields: [financialTransactions.wallet_id], references: [wallets.id] }),
	user: one(users, { fields: [financialTransactions.user_id], references: [users.id] })
}));

// Wallet transactions relations
export const walletTransactionsRelations = relations(walletTransactions, ({ one }) => ({
	senderWallet: one(wallets, {
		fields: [walletTransactions.sender_wallet_id],
		references: [wallets.id],
		relationName: 'sentTransactions'
	}),
	receiverWallet: one(wallets, {
		fields: [walletTransactions.receiver_wallet_id],
		references: [wallets.id],
		relationName: 'receivedTransactions'
	}),
	sender: one(users, { fields: [walletTransactions.sender_id], references: [users.id] }),
	receiver: one(users, { fields: [walletTransactions.receiver_id], references: [users.id] }),
	project: one(projects, { fields: [walletTransactions.project_id], references: [projects.id] })
}));

// Export all relations
export const allRelations = {
	users: usersRelations,
	user_profiles: profilesRelations,
	projects: projectsRelations,
	vendorProfiles: vendorProfilesRelations,
	socialMedia: socialMediaRelations,
	wallets: walletsRelations,
	financialStats: financialStatsRelations,
	favoriteProjects: favoriteProjectsRelations,
	savedFilters: savedFiltersRelations,
	followedClients: followedClientsRelations,
	financialTransactions: financialTransactionsRelations,
	walletTransactions: walletTransactionsRelations,
	session: sessionRelations
};
