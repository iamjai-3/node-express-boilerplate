const { execSync } = require('child_process');

const filename = process.argv[2];

if (!filename) {
  console.error('Please provide a filename for the migration');
  process.exit(1);
}

const command = `npm run typeorm migration:create src/database/migrations/${filename}`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error creating migration:', error);
  process.exit(1);
}
