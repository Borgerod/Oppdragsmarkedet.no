import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './optimized_schema_v2';
import { allRelations } from './relations';
import { env } from '$env/dynamic/private';

// Export all schema and relations
export * from './optimized_schema_v2';
export * from './relations';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);

// Create database instance with schema and relations
export const db = drizzle(client, {
	schema: { ...schema, ...allRelations }
});

// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import * as schema from './schema'; // Define schema in another file

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Load from .env
// });

// export const db = drizzle(pool, { schema });
