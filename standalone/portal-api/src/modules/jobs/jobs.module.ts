import { CronModule } from "@modules/cron";
import { Module } from "@nestjs/common";
import { DummyModule } from "./dummy";
import { MongoClient, Db } from 'mongodb';


const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => {
    const client = new MongoClient('mongodb://localhost:27017');
    console.log('connecting');
    await client.connect();
    console.log('connected');

    return client.db();
  },
}

@Module({
    imports: [
      CronModule.forRootAsync({
        useFactory: (mongo: Db) => ({
          mongo,
        }),
        inject: ['DATABASE_CONNECTION'],
        extraProviders: [databaseProvider],
      }),
      DummyModule,
    ]
  })
  export class JobsModule {}