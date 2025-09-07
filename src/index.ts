
import 'reflect-metadata';
import {DunixBeApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
// import {seed} from './seed';
import * as dotenv from 'dotenv';

export * from './application';

export async function main(options: ApplicationConfig = {
     rest: {
      host: '0.0.0.0',   // 👈 quan trọng để thiết bị khác truy cập được
      port: +(process.env.PORT ?? 3000),
    },
}) {
  const app = new DunixBeApplication(options);
  await app.boot();
  await app.migrateSchema();
  // await seed(app);
  await app.start();
  dotenv.config();  
  const url = app.restServer.url;
  console.log(`✅ Dunix BE is running at ${url}`);
  console.log(`📚 API Explorer: ${url}/explorer`);
  console.log('Server:', app.restServer.url); // in ra http://0.0.0.0:3000

  return app;
}

if (require.main === module) {
  main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
