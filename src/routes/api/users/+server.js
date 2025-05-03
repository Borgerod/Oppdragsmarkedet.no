// import { json } from '@sveltejs/kit';
// import { db } from '$lib/server/db/index.js';
// import { user } from '$lib/server/db/schema.js';

// export async function GET() {
// 	try {
// 		const users = await db.select().from(user);
// 		return json(users);
// 	} catch (error) {
// 		console.error('Error fetching users:', error);
// 		return json({ error: 'Failed to fetch users' }, { status: 500 });
// 	}
// }
import { db } from '$lib/server/db'; // Assuming db is set up in src/lib/server/db/index.js
import { user } from '$lib/server/db/schema'; // Your user schema

// Handle fetching users
export async function GET() {
  try {
    // Fetch all users from the database
    const users = await db.select().from(user);
    
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Error fetching users', { status: 500 });
  }
}







import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schema.js';

export async function POST() {
    try {
        const newUser = await db.insert(user).values({
            id: '1', // Replace with a UUID if needed
            age: 25,
            username: 'test_user',
            passwordHash: 'hashed_password_here'
        }).returning();

        return json({ message: 'User created', user: newUser });
    } catch (error) {
        console.error('Error inserting user:', error);
        return json({ error: 'Failed to insert user' }, { status: 500 });
    }
}
