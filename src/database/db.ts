import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { DATABASE_URL } from '../config';

export const client = postgres(DATABASE_URL as string);

export const db = drizzle(client, { schema, logger: true });
