import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createLogger } from './logger';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'Logger',
      useFactory: (configService: ConfigService) => {
        return createLogger(configService);
      },
      inject: [ConfigService]
    },
  ],
  exports: ['Logger'],
})
export class WinstonLoggerModule {}
