
import {DunixBeApplication} from './application';

export async function migrate() {
  const app = new DunixBeApplication();
  await app.boot();
  await app.migrateSchema();
  await app.stop();
  console.log('✅ Migration complete');
}

if (require.main === module) {
  migrate().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
