import { ConnectionOptions } from 'typeorm';
import config from 'config';
import path from 'path';

const dbConfig = config.get('db');

console.log('');


const entitiesPath = __dirname + '/../**/*.entity{.ts,.js}';
    const migrationPath = __dirname + '/../database/migrations/*{.ts,.js}';
    const seedsPath = __dirname + '/seeds/**/*{.ts,.js}';
    const factoriesPath = __dirname + '/factories/**/*{.ts,.js}';

    const entitiesRelativePath = path.relative(process.cwd(), entitiesPath);
    const migrationsRelativePath = path.relative(process.cwd(), migrationPath);
    const seedsRelativePath = path.relative(process.cwd(), seedsPath);
    const factoriesRelativePath = path.relative(process.cwd(), factoriesPath);


console.log('DIRNAME ', migrationsRelativePath);
console.log('DATABASE_HOST', process.env.DATABASE_HOST || dbConfig.DATABASE_HOST);
console.log('DATABASE_PORT', process.env.DATABASE_PORT || dbConfig.DATABASE_PORT);
console.log('DATABASE_USERNAME', process.env.DATABASE_USERNAME || dbConfig.DATABASE_USERNAME);
console.log('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD || dbConfig.DATABASE_PASSWORD);
console.log('DATABASE_NAME', process.env.DATABASE_NAME || dbConfig.DATABASE_NAME);
console.log('DATABASE_TYPE', process.env.DATABASE_TYPE || dbConfig.DATABASE_TYPE);

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
  migrations: [migrationsRelativePath],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src'
  }
};

export = ormConfig;
