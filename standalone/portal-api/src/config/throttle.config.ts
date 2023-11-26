import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import config from 'config';

const throttleConfigVariables = config.get('throttle.global') as any;
const redisConfig = config.get('queue') as any;

console.log('Redis config host', redisConfig.host);
console.log('Redis config port',redisConfig.port);
console.log('Redis config password',redisConfig.password);

const throttleConfig: ThrottlerModuleOptions = {
  ttl: process.env.THROTTLE_TTL || throttleConfigVariables.get('ttl'),
  limit: process.env.THROTTLE_LIMIT || throttleConfigVariables.get('limit'),
  storage: new ThrottlerStorageRedisService({
    host: process.env.REDIS_HOST || redisConfig.host,
    port: process.env.REDIS_PORT || redisConfig.port,
    password: process.env.REDIS_PASSWORD || redisConfig.password,
  }),
};

export = throttleConfig;
