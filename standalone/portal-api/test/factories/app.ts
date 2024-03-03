import { ThrottlerModule } from '@nestjs/throttler';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createConnection, getConnection } from 'typeorm';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

import { AppModule } from 'src/app.module';
import { RedisRateLimiter } from '../../src/modules/auth/limiter/redis.rate.limiter';
import { NoRateLimiter } from '../../src/modules/auth/limiter/no.rate.limiter';
import { Configuration } from '../../src/configuration';

const dbConfig = Configuration.db;
const throttleConfig = Configuration.throttle as any;
const throttleEnabled = throttleConfig.enabled as boolean;

export class AppFactory {
  private constructor(
    private readonly appInstance: INestApplication,
    private readonly redis?: Redis.Redis,
  ) {}

  get instance() {
    return this.appInstance;
  }

  static async new() {
    if (throttleEnabled) {
      const redis = await setupRedis();
      return await this.setupAppFactory(redis);
    }

    return await this.setupAppFactory();
  }

  private static async setupAppFactory(redis?: Redis.Redis) {
    const moduleBuilder = Test.createTestingModule({
      imports: [
        AppModule,
        ThrottlerModule.forRootAsync({
          useFactory: () => {
            return {
              ttl: 60,
              limit: 60,
              storage: new ThrottlerStorageRedisService(redis),
            };
          },
        }),
      ],
    })
      .overrideProvider('LOGIN_THROTTLE')
      .useFactory({
        factory: () => {
          if (redis) {
            return new RedisRateLimiter(
              new RateLimiterRedis({
                storeClient: redis,
                keyPrefix: 'login',
                points: 5,
                duration: 60 * 60 * 24 * 30, // Store number for 30 days since first fail
                blockDuration: 3000,
              }),
            );
          } else {
            return new NoRateLimiter();
          }
        },
      });

    const module = await moduleBuilder.compile();

    const app = module.createNestApplication(undefined, {
      logger: false,
    });

    await app.init();

    const connection = await createConnection({
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.name,
      username: dbConfig.username,
      password: dbConfig.password,
      entities: ['src\\**\\*.entity{.ts,.js}'],
      migrations: ['src\\database\\migrations\\**\\*{.ts,.js}'],
      name: 'testing',
    });

    await connection.synchronize(false); // Drops and creates the schema
    await connection.close();
    return new AppFactory(app, redis);
  }

  async close() {
    await getConnection().dropDatabase();
    if (this.redis && throttleEnabled) {
      await this.teardown(this.redis);
    }
    if (this.appInstance) await this.appInstance.close();
  }

  static async cleanupDB() {
    const connection = getConnection();
    const tables = connection.entityMetadatas.map(
      (entity) => `"${entity.tableName}"`,
    );

    for (const table of tables) {
      const exists = await connection.query(`SELECT EXISTS (
        SELECT FROM 
          pg_catalog.pg_tables 
        WHERE 
          schemaname != 'pg_catalog' AND 
          schemaname != 'information_schema' AND 
          tablename = '${table}'
      );`);

      let tableExists = false;

      // result is expected to be an array with one object: [{ exists: boolean }]
      if (exists && exists.length > 0) {
        tableExists = exists[0].exists;
      }

      if (tableExists) {
        try {
          await connection.query(`DELETE FROM ${table};`);
        } catch (e) {}
      } else {
      }
    }
  }

  static async dropTables() {
    const connection = await createConnection({
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.name,
      username: dbConfig.username,
      password: dbConfig.password,
      entities: ['src\\**\\*.entity{.ts,.js}'],
      migrations: ['src\\database\\migrations\\**\\*{.ts,.js}'],
      name: 'testing',
    });

    await connection.query(`SET session_replication_role = 'replica';`);

    const tables = connection.entityMetadatas.map(
      (entity) => `"${entity.tableName}"`,
    );

    for (const tableName of tables) {
      try {
        await connection.query(`DROP TABLE IF EXISTS ${tableName};`);
      } catch (e) {}
    }

    await connection.close();
  }

  async teardown(redis: Redis.Redis) {
    return new Promise<void>((resolve) => {
      redis.disconnect();
      redis.on('end', () => {
        resolve();
      });
    });
  }
}

const setupRedis = async () => {
  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  });

  await redis.flushall();
  return redis;
};
