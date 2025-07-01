import { relations } from "drizzle-orm/relations";
import { user, vendorProfiles, financialTransactions, wallets, walletTransactions, projects, financialStats, accounts, oauthSessions, session, favoriteProjects, savedFilters, followedClients, socialMedia, userProfiles } from "./schema";

export const vendorProfilesRelations = relations(vendorProfiles, ({one}) => ({
	user: one(user, {
		fields: [vendorProfiles.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	vendorProfiles: many(vendorProfiles),
	financialTransactions: many(financialTransactions),
	walletTransactions_senderId: many(walletTransactions, {
		relationName: "walletTransactions_senderId_user_id"
	}),
	walletTransactions_receiverId: many(walletTransactions, {
		relationName: "walletTransactions_receiverId_user_id"
	}),
	financialStats: many(financialStats),
	accounts: many(accounts),
	oauthSessions: many(oauthSessions),
	sessions: many(session),
	favoriteProjects: many(favoriteProjects),
	savedFilters: many(savedFilters),
	followedClients_userId: many(followedClients, {
		relationName: "followedClients_userId_user_id"
	}),
	followedClients_clientId: many(followedClients, {
		relationName: "followedClients_clientId_user_id"
	}),
	wallets: many(wallets),
	projects_clientId: many(projects, {
		relationName: "projects_clientId_user_id"
	}),
	projects_vendorId: many(projects, {
		relationName: "projects_vendorId_user_id"
	}),
	socialMedias: many(socialMedia),
	userProfiles: many(userProfiles),
}));

export const financialTransactionsRelations = relations(financialTransactions, ({one}) => ({
	user: one(user, {
		fields: [financialTransactions.userId],
		references: [user.id]
	}),
	wallet: one(wallets, {
		fields: [financialTransactions.walletId],
		references: [wallets.id]
	}),
}));

export const walletsRelations = relations(wallets, ({one, many}) => ({
	financialTransactions: many(financialTransactions),
	walletTransactions_senderWalletId: many(walletTransactions, {
		relationName: "walletTransactions_senderWalletId_wallets_id"
	}),
	walletTransactions_receiverWalletId: many(walletTransactions, {
		relationName: "walletTransactions_receiverWalletId_wallets_id"
	}),
	user: one(user, {
		fields: [wallets.userId],
		references: [user.id]
	}),
}));

export const walletTransactionsRelations = relations(walletTransactions, ({one}) => ({
	user_senderId: one(user, {
		fields: [walletTransactions.senderId],
		references: [user.id],
		relationName: "walletTransactions_senderId_user_id"
	}),
	user_receiverId: one(user, {
		fields: [walletTransactions.receiverId],
		references: [user.id],
		relationName: "walletTransactions_receiverId_user_id"
	}),
	wallet_senderWalletId: one(wallets, {
		fields: [walletTransactions.senderWalletId],
		references: [wallets.id],
		relationName: "walletTransactions_senderWalletId_wallets_id"
	}),
	wallet_receiverWalletId: one(wallets, {
		fields: [walletTransactions.receiverWalletId],
		references: [wallets.id],
		relationName: "walletTransactions_receiverWalletId_wallets_id"
	}),
	project: one(projects, {
		fields: [walletTransactions.projectId],
		references: [projects.id]
	}),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
	walletTransactions: many(walletTransactions),
	favoriteProjects: many(favoriteProjects),
	user_clientId: one(user, {
		fields: [projects.clientId],
		references: [user.id],
		relationName: "projects_clientId_user_id"
	}),
	user_vendorId: one(user, {
		fields: [projects.vendorId],
		references: [user.id],
		relationName: "projects_vendorId_user_id"
	}),
}));

export const financialStatsRelations = relations(financialStats, ({one}) => ({
	user: one(user, {
		fields: [financialStats.userId],
		references: [user.id]
	}),
}));

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(user, {
		fields: [accounts.userId],
		references: [user.id]
	}),
}));

export const oauthSessionsRelations = relations(oauthSessions, ({one}) => ({
	user: one(user, {
		fields: [oauthSessions.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const favoriteProjectsRelations = relations(favoriteProjects, ({one}) => ({
	user: one(user, {
		fields: [favoriteProjects.userId],
		references: [user.id]
	}),
	project: one(projects, {
		fields: [favoriteProjects.projectId],
		references: [projects.id]
	}),
}));

export const savedFiltersRelations = relations(savedFilters, ({one}) => ({
	user: one(user, {
		fields: [savedFilters.userId],
		references: [user.id]
	}),
}));

export const followedClientsRelations = relations(followedClients, ({one}) => ({
	user_userId: one(user, {
		fields: [followedClients.userId],
		references: [user.id],
		relationName: "followedClients_userId_user_id"
	}),
	user_clientId: one(user, {
		fields: [followedClients.clientId],
		references: [user.id],
		relationName: "followedClients_clientId_user_id"
	}),
}));

export const socialMediaRelations = relations(socialMedia, ({one}) => ({
	user: one(user, {
		fields: [socialMedia.userId],
		references: [user.id]
	}),
}));

export const userProfilesRelations = relations(userProfiles, ({one}) => ({
	user: one(user, {
		fields: [userProfiles.userId],
		references: [user.id]
	}),
}));