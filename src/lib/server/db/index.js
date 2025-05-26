// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from './optimized_schema_v2';
// import { allRelations } from './relations';
// import { env } from '$env/dynamic/private';

// export * from './optimized_schema_v2';
// export * from './relations';

// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
// const client = postgres(env.DATABASE_URL);

// export const db = drizzle(client, {
// 	schema: { ...schema, ...allRelations }
// });
