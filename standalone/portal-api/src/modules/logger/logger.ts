import { ConfigService } from '@nestjs/config';
import { FluentdTransport } from 'src/common/logging/fluentd.transport';
import * as winston from 'winston';
import TransportStream from 'winston-transport';
import { Configuration } from '../../configuration';

// {
//   emerg: 0,
//   alert: 1,
//   crit: 2,
//   error: 3,
//   warning: 4,
//   notice: 5,
//   info: 6,
//   debug: 7
// }

export type loggingLevel = 
'emerg'
| 'alert'
| 'crit'
| 'error'
| 'warning'
| 'notice'
| 'info'
| 'debug';

export function createLogger() {
  const loginToFluentd = Configuration.logging.fluentdlogging;
  const loggingLevel = Configuration.logging.level as loggingLevel;

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
