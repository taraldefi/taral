import { Logger, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';
import config from 'config';

import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { MailModule } from 'src/modules/mail/mail.module';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { RefreshTokenModule } from 'src/modules/refresh-token/refresh-token.module';
import { JwtTwoFactorStrategy } from 'src/common/strategy/jwt-two-factor.strategy';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { UserEntity } from './entity/user.entity';
import { UserEntityRepositoryProvider } from './user.repository.provider';
import { RoleEntityRepositoryProvider } from '../role/role.repository.provider';
import { ConfigService } from '@nestjs/config';
import { RedisRateLimiter } from './limiter/redis.rate.limiter';
import { NoRateLimiter } from './limiter/no.rate.limiter';
import { loggingLevel } from '../logger/logger';
import winston from 'winston';

const throttleLoginConfig = config.get('throttle.login') as any;
const redisConfig = config.get('queue') as any;
const jwtConfig = config.get('jwt') as any;
const loggingLevel = config.get('logging.level') as loggingLevel;

const LoginThrottleFactory = {
  provide: 'LOGIN_THROTTLE',
  useFactory: () => {
    const redisClient = new Redis({
      enableOfflineQueue: false,
      host: process.env.REDIS_HOST || redisConfig.host,
      port: process.env.REDIS_PORT || redisConfig.port,
      password: process.env.REDIS_PASSWORD || redisConfig.password,
    });

    const rateLimiterRedis = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: throttleLoginConfig.prefix,
      points: throttleLoginConfig.limit,
      duration: 60 * 60 * 24 * 30, // Store number for 30 days since first fail
      blockDuration: throttleLoginConfig.blockDuration,
    });

    return new RedisRateLimiter(rateLimiterRedis);
  },
};

const NoLoginThrottleFactory = {
  provide: 'LOGIN_THROTTLE',
  useFactory: () => {
    return new NoRateLimiter();
  },
}

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || jwtConfig.secret,
        secretOrPrivateKey: process.env.JWT_SECRET || jwtConfig.secret,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN || jwtConfig.expiresIn,
        },
      }),
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([UserEntity]),
    MailModule,
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [
    ...AuthModule.createDynamicProviders(),
  ],
  exports: [
    AuthService,
    JwtTwoFactorStrategy,
    JwtStrategy,
    PassportModule,
    JwtModule,
  ],
})
export class AuthModule {
  constructor() {
  }

  static createDynamicProviders(): Provider[] {
    const logger = new Logger("AuthModule");

    const providers: Provider[] = [
      AuthService,
      JwtTwoFactorStrategy,
      JwtStrategy,
      UniqueValidatorPipe,
      UserEntityRepositoryProvider,
      RoleEntityRepositoryProvider,
    ];

    const config = new ConfigService();

    const shouldEnableThrottle = config.get('throttle.enabled');

    if (shouldEnableThrottle) {
      logger.log('info', 'Enabling throttling');
      providers.push(LoginThrottleFactory);
    } else {
      logger.log('info', 'Not running in throttle mode');
      providers.push(NoLoginThrottleFactory);
    }

    return providers;
  }
}
