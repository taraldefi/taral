import { ConnectionOptions } from 'typeorm';
import config from 'config';

const dbConfig = config.get('database');
const ormConfig: ConnectionOptions = {
  type: process.env.DATABASE_TYPE || dbConfig.DATABASE_TYPE,
  host: process.env.DATABASE_HOST || dbConfig.DATABASE_HOST,
  port: process.env.DATABASE_PORT || dbConfig.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME || dbConfig.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD || dbConfig.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || dbConfig.DATABASE_NAME,
  migrationsTransactionMode: 'each',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: false,
  synchronize: false,
  migrationsRun: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
};

export = ormConfig;
