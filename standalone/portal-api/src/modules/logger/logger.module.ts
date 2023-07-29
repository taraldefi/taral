import { Module } from '@nestjs/common';
import logger from './logger';

@Module({
  providers: [
    {
      provide: 'Logger',
      useValue: logger,
    },
  ],
  exports: ['Logger'],
})
export class LoggerModule {}
