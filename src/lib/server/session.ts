import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { db } from '@db/index';
import type { RequestEvent } from '@sveltejs/kit';

import { session, user } from '@db/schema';
import { eq } from 'drizzle-orm';

export interface Session {
	id: string;
	userId: string;
	expiresAt: Date;
	secretHash: string;
}

export interface SessionValidationResult {
	session: Session | null;
	user: any | null;
}

const sessionExpiresInSeconds = 60 * 60 * 24 * 7; // 7 days

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const secretHash = encodeHexLowerCase(sha256(new TextEncoder().encode(token + 'secret')));

	const sessionData: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + sessionExpiresInSeconds * 1000),
		secretHash
	};
	await db.insert(session).values(sessionData);
	return sessionData;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: user, session: session })
		.from(session)
		.innerJoin(user, eq(session.userId, user.id))
		.where(eq(session.id, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user: userData, session: sessionData } = result[0];
	if (Date.now() >= sessionData.expiresAt.getTime()) {
		await db.delete(session).where(eq(session.id, sessionData.id));
		return { session: null, user: null };
	}
	if (Date.now() >= sessionData.expiresAt.getTime() - (sessionExpiresInSeconds * 1000) / 2) {
		sessionData.expiresAt = new Date(Date.now() + sessionExpiresInSeconds * 1000);
		await db
			.update(session)
			.set({
				expiresAt: sessionData.expiresAt
			})
			.where(eq(session.id, sessionData.id));
	}
	return { session: sessionData, user: userData };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(session).where(eq(session.id, sessionId));
}

// export function setSessionTokenCookie(event: RequestEvent, token: string, session.expiresAt:string): void {
// 	event.cookies.set('session_token', token, {
// 		maxAge: sessionExpiresInSeconds,
// 		httpOnly: true,
// 		secure: true,
// 		path: '/',
// 		sameSite: 'lax'
// 	});
// }
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session_token', token, {
		expires: expiresAt,
		httpOnly: true,
		secure: true,
		path: '/',
		sameSite: 'lax'
	});
}
export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session_token', '', {
		maxAge: 0,
		httpOnly: true,
		secure: true,
		path: '/',
		sameSite: 'lax'
	});
}
// ...existing code...

// // import { db } from "./db";
// import { db } from '@db/index';

// import { encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
// import { sha256 } from '@oslojs/crypto/sha2';

// // import type { User } from "./user";
// import type { RequestEvent } from '@sveltejs/kit';

// const sessionExpiresInSeconds = 60 * 60 * 24; // 1 day
// // const sessionExpiresInSeconds = 60 * 60 * 24 * 7; // 7 days

// function generateSecureRandomString(): string {
// 	// Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
// 	const alphabet = 'abcdefghijklmnpqrstuvwxyz23456789';

// 	// Generate 24 bytes = 192 bits of entropy.
// 	// We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
// 	const bytes = new Uint8Array(24);
// 	crypto.getRandomValues(bytes);

// 	let id = '';
// 	for (let i = 0; i < bytes.length; i++) {
// 		// >> 3 "removes" the right-most 3 bits of the byte
// 		id += alphabet[bytes[i] >> 3];
// 	}
// 	return id;
// }

// async function createSession(dbPool: DBPool, userId: string): Promise<SessionWithToken> {
// 	const now = new Date();

// 	const id = generateSecureRandomString();
// 	const secret = generateSecureRandomString();
// 	const secretHash = await hashSecret(secret);

// 	const token = id + '.' + secret;

// 	const session: SessionWithToken = {
// 		id,
// 		userId,
// 		secretHash,
// 		createdAt: now,
// 		token
// 	};

// 	await executeQuery(
// 		dbPool,
// 		'INSERT INTO session (id, user_id, secret_hash, created_at) VALUES (?, ?, ?, ?)',
// 		[session.id, session.userId, session.secretHash, Math.floor(session.createdAt.getTime() / 1000)]
// 	);

// 	return session;
// }

// async function validateSessionToken(dbPool: DBPool, token: string): Promise<Session | null> {
// 	const tokenParts = token.split('.');
// 	if (tokenParts.length != 2) {
// 		return null;
// 	}
// 	const sessionId = tokenParts[0];
// 	const sessionSecret = tokenParts[1];

// 	const session = await getSession(dbPool, sessionId);
// 	if (!session) {
// 		return null;
// 	}

// 	const tokenSecretHash = await hashSecret(sessionSecret);
// 	const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
// 	if (!validSecret) {
// 		return null;
// 	}

// 	return session;
// }

// async function getSession(dbPool: DBPool, sessionId: string): Promise<Session | null> {
// 	const now = new Date();

// 	const result = await executeQuery(
// 		dbPool,
// 		'SELECT id, user_id, secret_hash, created_at FROM session WHERE id = ?',
// 		[sessionId]
// 	);
// 	if (result.rows.length !== 1) {
// 		return null;
// 	}
// 	const row = result.rows[0];
// 	const session: Session = {
// 		id: row[0],
// 		userId: row[1],
// 		secretHash: row[2],
// 		createdAt: new Date(row[3] * 1000)
// 	};

// 	// Check expiration
// 	if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
// 		await deleteSession(dbPool, sessionId);
// 		return null;
// 	}

// 	return session;
// }

// async function deleteSession(dbPool: DBPool, sessionId: string): Promise<void> {
// 	await executeQuery(dbPool, 'DELETE FROM session WHERE id = ?', [sessionId]);
// }

// // function setSessionTokenCookie(event: RequestEvent, token: string): void {
// // 	event.cookies.set('session_token', token, {
// // 		maxAge: sessionExpiresInSeconds,
// // 		httpOnly: true,
// // 		secure: true,
// // 		path: '/',
// // 		sameSite: 'lax'
// // 	});
// // }

// function setSessionTokenCookie(event: RequestEvent, token: string): void {
// 	event.cookies.set('session_token', token, {
// 		maxAge: sessionExpiresInSeconds,
// 		httpOnly: true,
// 		secure: true,
// 		path: '/',
// 		sameSite: 'lax'
// 	});
// }

// function deleteSessionTokenCookie(event: RequestEvent): void {
// 	event.cookies.delete('session_token', {
// 		path: '/'
// 	});
// }

// function encodeSessionPublicJSON(session: Session): string {
// 	// Omit Session.secretHash
// 	const json = JSON.stringify({
// 		id: session.id,
// 		userId: session.userId,
// 		created_at: Math.floor(session.createdAt.getTime() / 1000)
// 	});
// 	return json;
// }

// function verifyRequestOrigin(method: string, originHeader: string): boolean {
// 	if (method === 'GET' || method === 'HEAD') {
// 		return true;
// 	}
// 	// Replace with your actual domain
// 	const allowedOrigins = ['https://oppdragsmarkedet.no', 'http://localhost:5173'];
// 	return allowedOrigins.includes(originHeader);
// }

// async function hashSecret(secret: string): Promise<Uint8Array> {
// 	const secretBytes = new TextEncoder().encode(secret);
// 	const secretHashBuffer = await crypto.subtle.digest('SHA-256', secretBytes);
// 	return new Uint8Array(secretHashBuffer);
// }

// function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
// 	if (a.byteLength !== b.byteLength) {
// 		return false;
// 	}
// 	let c = 0;
// 	for (let i = 0; i < a.byteLength; i++) {
// 		c |= a[i] ^ b[i];
// 	}
// 	return c === 0;
// }

// export function invalidateSession(sessionId: string): void {
// 	db.execute('DELETE FROM session WHERE id = ?', [sessionId]);
// }
// export function deleteSessionTokenCookie(event: RequestEvent): void {
// 	event.cookies.set('session', '', {
// 		httpOnly: true,
// 		path: '/',
// 		secure: import.meta.env.PROD,
// 		sameSite: 'lax',
// 		maxAge: 0
// 	});
// }

// interface SessionWithToken extends Session {
// 	token: string;
// }

// interface Session {
// 	id: string;
// 	userId: string;
// 	secretHash: Uint8Array;
// 	createdAt: Date;
// }
