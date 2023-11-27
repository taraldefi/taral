import { ConfigService } from '@nestjs/config';
import { FluentdTransport } from 'src/common/logging/fluentd.transport';
import * as winston from 'winston';
import TransportStream from 'winston-transport';

export type loggingLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose';

export function createLogger(configService: ConfigService) {
  const loginToFluentd = configService.get('logging.fluentdlogging');
  const loggingLevel = configService.get('logging.level') as loggingLevel;

  const transports: TransportStream[] = [new winston.transports.Console()];

  if (loginToFluentd) {
    transports.push(
      new FluentdTransport({
        tag: 'my.app',
        host: 'localhost',
        port: 24224,
      }),
    );
  }

  // can be : error, warn, info, debug, verbose
  return winston.createLogger({
    level: loggingLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: transports,
  });
}
