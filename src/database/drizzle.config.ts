import { Config, defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from '../config';

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
}) satisfies Config;
