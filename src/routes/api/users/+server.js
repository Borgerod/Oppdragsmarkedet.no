// import { json } from '@sveltejs/kit';
// import { db } from '$lib/server/db/index.js';
// import { user } from '$lib/server/db/schema.js';

// export async function GET() {
// 	try {
// 		const user = await db.select().from(user);
// 		return json(user);
// 	} catch (error) {
// 		console.error('Error fetching user:', error);
// 		return json({ error: 'Failed to fetch user' }, { status: 500 });
// 	}
// }
import { db } from '@src/lib/server/db/ignore'; // Assuming db is set up in src/lib/server/db/index.js
import { user } from '$lib/server/db/ignore/schema'; // Your user schema

// Handle fetching user
export async function GET() {
	try {
		// Fetch all user from the database
		const user = await db.select().from(user);

		return new Response(JSON.stringify(user), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		return new Response('Error fetching user', { status: 500 });
	}
}

import { json } from '@sveltejs/kit';
import { db } from '@src/lib/server/db/ignore/index.js';
import { user } from '$lib/server/db/ignore/schema.js';

export async function POST() {
	try {
		const newUser = await db
			.insert(user)
			.values({
				id: '1', // Replace with a UUID if needed
				age: 25,
				username: 'test_user',
				passwordHash: 'hashed_password_here'
			})
			.returning();

		return json({ message: 'User created', user: newUser });
	} catch (error) {
		console.error('Error inserting user:', error);
		return json({ error: 'Failed to insert user' }, { status: 500 });
	}
}
