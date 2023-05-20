import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

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
      type: this.configService.get('database.type', { infer: true }),
      url: this.configService.get('database.url', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      synchronize: this.configService.get('database.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.get('app.nodeEnv') !== 'production',
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
        max: this.configService.get('database.maxConnections', { infer: true }),
        ssl: this.configService.get('database.sslEnabled', { infer: true })
          ? {
              rejectUnauthorized: this.configService.get(
                'database.rejectUnauthorized',
                { infer: true },
              ),
              ca: this.configService.get('database.ca', { infer: true })
                ? this.configService.get('database.ca', { infer: true })
                : undefined,
              key: this.configService.get('database.key', { infer: true })
                ? this.configService.get('database.key', { infer: true })
                : undefined,
              cert: this.configService.get('database.cert', { infer: true })
                ? this.configService.get('database.cert', { infer: true })
                : undefined,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
