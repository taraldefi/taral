import { ConnectionOptions } from 'typeorm';
import config from 'config';
import path from 'path';

const dbConfig = config.get('db');

console.log(JSON.stringify(dbConfig, null, 2));


const entitiesPath = __dirname + '/../**/*.entity{.ts,.js}';
const migrationPath = __dirname + '/../database/migrations/*{.ts,.js}';
const seedsPath = __dirname + '/seeds/**/*{.ts,.js}';
const factoriesPath = __dirname + '/factories/**/*{.ts,.js}';

const entitiesRelativePath = path.relative(process.cwd(), entitiesPath);
const migrationsRelativePath = path.relative(process.cwd(), migrationPath);
const seedsRelativePath = path.relative(process.cwd(), seedsPath);
const factoriesRelativePath = path.relative(process.cwd(), factoriesPath);


console.log('DIRNAME ', migrationsRelativePath);
console.log('ENTITIES', __dirname + '/../**/*.entity.{js,ts}');
console.log('DATABASE_HOST', dbConfig.host || process.env.host);
console.log('DATABASE_PORT', process.env.port || dbConfig.port);
console.log('DATABASE_USERNAME', dbConfig.username || process.env.username);
console.log('DATABASE_PASSWORD', process.env.password || dbConfig.password);
console.log('DATABASE_NAME', process.env.name || dbConfig.name);
console.log('DATABASE_TYPE', process.env.type || dbConfig.type);

const ormConfig: ConnectionOptions = {
  type: dbConfig.type || process.env.type,
  host: process.env.host || dbConfig.host,
  port: process.env.host || dbConfig.port,
  username: dbConfig.username || process.env.username,
  password: process.env.password || dbConfig.password,
  database: process.env.name || dbConfig.name,
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
