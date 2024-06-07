import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '../config';
import { logger } from '../utils/logger';

console.log('DATABASE_URL', DATABASE_URL);

const migrationClient = postgres(DATABASE_URL as string, {
  max: 1,
  onnotice: () => {}, // To disable NOTICE on terminal
});

async function runMigrations() {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: 'src/database/migrations',
      migrationsSchema: 'public',
      migrationsTable: 'migrations',
    });
    logger.info('Migrated successfully...');
  } catch (error) {
    logger.error('Migrations failed', error);
  }

  await migrationClient.end();
}

runMigrations();
