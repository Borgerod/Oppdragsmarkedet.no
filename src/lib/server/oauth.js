import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/sveltekit/providers/google';
import { dev } from '$app/environment';
import { db } from '@db/index';
import { accounts, oauthSessions, user, verificationTokens } from '@db/schema';
import { env } from '$env/dynamic/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: user,
		accountsTable: accounts,
		sessionsTable: oauthSessions,
		verificationTokensTable: verificationTokens
	}),
	providers: [
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		})
	],
	callbacks: {
		async session({ session, user, token }) {
			if (session?.user) {
				session.user.id = user.id;
				// Attach Google profile fields if available
				if (user.email) session.user.email = user.email;
				if (user.name) session.user.name = user.name;
				if (user.image) session.user.image = user.image;
				// If the token contains Google profile info, attach it
				if (token?.picture) session.user.image = token.picture;
				if (token?.email) session.user.email = token.email;
				if (token?.name) session.user.name = token.name;

				console.log('🔐 OAUTH LOGIN SESSION:');
				console.log('📧 Email:', session.user.email);
				console.log('👤 Name:', session.user.name);
				console.log('🖼️ Image:', session.user.image);
				console.log('🆔 ID:', session.user.id);
			}
			console.log(
				'[auth][debug]: session callback',
				JSON.stringify({ session, user, token }, null, 2)
			);
			return session;
		},
		async jwt({ user, token, account, profile }) {
			if (user) {
				token.uid = user.id;
				if (user.email) token.email = user.email;
				if (user.name) token.name = user.name;
				if (user.image) token.picture = user.image;
			}
			if (profile) {
				if (profile.email) token.email = profile.email;
				if (profile.name) token.name = profile.name;
				if (profile.picture) token.picture = profile.picture;
				console.log('[auth][debug]: jwt callback profile', JSON.stringify(profile, null, 2));
			}
			console.log(
				'[auth][debug]: jwt callback',
				JSON.stringify({ user, token, account, profile }, null, 2)
			);
			return token;
		}
	},
	pages: {
		signIn: '/login',
		error: '/auth/error'
	},
	secret: env.AUTH_SECRET,
	trustHost: true,
	debug: dev
});
