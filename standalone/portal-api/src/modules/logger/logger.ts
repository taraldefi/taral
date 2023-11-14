import { ConfigService } from '@nestjs/config';
import { FluentdTransport } from 'src/common/logging/fluentd.transport';
import * as winston from 'winston';
import TransportStream from 'winston-transport';

export function createLogger(configService: ConfigService) {
  const loginToFluentd = configService.get('app.fluentdlogging');

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

  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: transports,
  });
}
