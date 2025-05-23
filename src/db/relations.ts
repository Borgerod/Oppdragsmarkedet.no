import { relations } from 'drizzle-orm/relations';
import {
	users,
	favoriteProjects,
	projects,
	savedFilters,
	followedClients,
	wallets,
	financialTransactions,
	walletTransactions,
	userProfiles,
	sessions,
	vendorProfiles,
	socialMedia,
	financialStats
} from './schema';

export const favoriteProjectsRelations = relations(favoriteProjects, ({ one }) => ({
	user: one(users, {
		fields: [favoriteProjects.userId],
		references: [users.id]
	}),
	project: one(projects, {
		fields: [favoriteProjects.projectId],
		references: [projects.id]
	})
}));

export const usersRelations = relations(users, ({ many }) => ({
	favoriteProjects: many(favoriteProjects),
	savedFilters: many(savedFilters),
	followedClients_userId: many(followedClients, {
		relationName: 'followedClients_userId_users_id'
	}),
	followedClients_clientId: many(followedClients, {
		relationName: 'followedClients_clientId_users_id'
	}),
	wallets: many(wallets),
	financialTransactions: many(financialTransactions),
	walletTransactions_senderId: many(walletTransactions, {
		relationName: 'walletTransactions_senderId_users_id'
	}),
	walletTransactions_receiverId: many(walletTransactions, {
		relationName: 'walletTransactions_receiverId_users_id'
	}),
	userProfiles: many(userProfiles),
	sessions: many(sessions),
	projects_clientId: many(projects, {
		relationName: 'projects_clientId_users_id'
	}),
	projects_vendorId: many(projects, {
		relationName: 'projects_vendorId_users_id'
	}),
	vendorProfiles: many(vendorProfiles),
	socialMedias: many(socialMedia),
	financialStats: many(financialStats)
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
	favoriteProjects: many(favoriteProjects),
	walletTransactions: many(walletTransactions),
	user_clientId: one(users, {
		fields: [projects.clientId],
		references: [users.id],
		relationName: 'projects_clientId_users_id'
	}),
	user_vendorId: one(users, {
		fields: [projects.vendorId],
		references: [users.id],
		relationName: 'projects_vendorId_users_id'
	})
}));

export const savedFiltersRelations = relations(savedFilters, ({ one }) => ({
	user: one(users, {
		fields: [savedFilters.userId],
		references: [users.id]
	})
}));

export const followedClientsRelations = relations(followedClients, ({ one }) => ({
	user_userId: one(users, {
		fields: [followedClients.userId],
		references: [users.id],
		relationName: 'followedClients_userId_users_id'
	}),
	user_clientId: one(users, {
		fields: [followedClients.clientId],
		references: [users.id],
		relationName: 'followedClients_clientId_users_id'
	})
}));

export const walletsRelations = relations(wallets, ({ one, many }) => ({
	user: one(users, {
		fields: [wallets.userId],
		references: [users.id]
	}),
	financialTransactions: many(financialTransactions),
	walletTransactions_senderWalletId: many(walletTransactions, {
		relationName: 'walletTransactions_senderWalletId_wallets_id'
	}),
	walletTransactions_receiverWalletId: many(walletTransactions, {
		relationName: 'walletTransactions_receiverWalletId_wallets_id'
	})
}));

export const financialTransactionsRelations = relations(financialTransactions, ({ one }) => ({
	wallet: one(wallets, {
		fields: [financialTransactions.walletId],
		references: [wallets.id]
	}),
	user: one(users, {
		fields: [financialTransactions.userId],
		references: [users.id]
	})
}));

export const walletTransactionsRelations = relations(walletTransactions, ({ one }) => ({
	wallet_senderWalletId: one(wallets, {
		fields: [walletTransactions.senderWalletId],
		references: [wallets.id],
		relationName: 'walletTransactions_senderWalletId_wallets_id'
	}),
	wallet_receiverWalletId: one(wallets, {
		fields: [walletTransactions.receiverWalletId],
		references: [wallets.id],
		relationName: 'walletTransactions_receiverWalletId_wallets_id'
	}),
	user_senderId: one(users, {
		fields: [walletTransactions.senderId],
		references: [users.id],
		relationName: 'walletTransactions_senderId_users_id'
	}),
	user_receiverId: one(users, {
		fields: [walletTransactions.receiverId],
		references: [users.id],
		relationName: 'walletTransactions_receiverId_users_id'
	}),
	project: one(projects, {
		fields: [walletTransactions.projectId],
		references: [projects.id]
	})
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
	user: one(users, {
		fields: [userProfiles.userId],
		references: [users.id]
	})
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const vendorProfilesRelations = relations(vendorProfiles, ({ one }) => ({
	user: one(users, {
		fields: [vendorProfiles.userId],
		references: [users.id]
	})
}));

export const socialMediaRelations = relations(socialMedia, ({ one }) => ({
	user: one(users, {
		fields: [socialMedia.userId],
		references: [users.id]
	})
}));

export const financialStatsRelations = relations(financialStats, ({ one }) => ({
	user: one(users, {
		fields: [financialStats.userId],
		references: [users.id]
	})
}));
