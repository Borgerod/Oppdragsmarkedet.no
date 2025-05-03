import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';



if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
	schema
});



// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import * as schema from './schema'; // Define schema in another file

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Load from .env
// });

// export const db = drizzle(pool, { schema });
