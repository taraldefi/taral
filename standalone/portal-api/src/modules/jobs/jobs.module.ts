import { CronModule } from '@modules/cron';
import { Module } from '@nestjs/common';
import { DummyModule } from './dummy';
import { MongoClient, Db } from 'mongodb';
import { AgendaConfig } from 'agenda';

const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => {
    const client = new MongoClient('mongodb://localhost:27017');
    console.log('connecting');
    await client.connect();
    console.log('connected');

    return client.db();
  },
};

// {
//   useFactory: (mongo: Db) => ({
//     mongo,
//   }),
//   inject: ['DATABASE_CONNECTION'],
//   extraProviders: [databaseProvider],
// }

function getAgendaConfigFactory(mongoClient: Db): any {
  const result = {
    mongo: mongoClient,
  };

  return result;
}

@Module({
  imports: [
    CronModule.forRootAsync({
      useFactory: (mongo: Db) => getAgendaConfigFactory(mongo),
      inject: ['DATABASE_CONNECTION'],
      extraProviders: [databaseProvider],
    }),
    DummyModule,
  ],
})
export class JobsModule {}
