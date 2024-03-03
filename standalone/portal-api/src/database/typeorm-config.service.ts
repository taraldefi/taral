import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import { Configuration } from '../configuration';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entitiesPath = __dirname + '/../**/*.entity{.ts,.js}';
    const migrationPath = __dirname + '/migrations/**/*{.ts,.js}';
    const seedsPath = __dirname + '/seeds/**/*{.ts,.js}';
    const factoriesPath = __dirname + '/factories/**/*{.ts,.js}';

    const entitiesRelativePath = path.relative(process.cwd(), entitiesPath);
    const migrationsRelativePath = path.relative(process.cwd(), migrationPath);
    const seedsRelativePath = path.relative(process.cwd(), seedsPath);
    const factoriesRelativePath = path.relative(process.cwd(), factoriesPath);

    return {
      type: Configuration.db.type,
      url: Configuration.db.url,
      host: Configuration.db.host,
      port: Configuration.db.port,
      username: Configuration.db.username,
      password: Configuration.db.password,
      database: Configuration.db.name,
      synchronize: Configuration.db.synchronize,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: Configuration.app.nodeEnv !== 'production' && Configuration.app.nodeEnv !== 'test',
      entities: [entitiesRelativePath],
      migrations: [migrationsRelativePath],
      seeds: [seedsRelativePath],
      factories: [factoriesRelativePath],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/api/pool
        // max connection pool size
        max: Configuration.db.maxConnections,
        ssl: Configuration.db.sslEnabled
          ? {
              rejectUnauthorized: Configuration.db.rejectUnauthorized,
              ca: Configuration.db.ca ? Configuration.db.ca : undefined,
              key: Configuration.db.key ? Configuration.db.key : undefined,
              cert: Configuration.db.cert ? Configuration.db.cert : undefined,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
