import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';
// or import { SeqTransport } from '@datalust/winston-seq';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(  /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: {  application: 'taral' },
  transports: [
    new winston.transports.Console({
        format: winston.format.simple(),
    }),
    new SeqTransport({
      serverUrl: "https://your-seq-server:5341",
      apiKey: "your-api-key",
      onError: (e => { console.error(e) }),
      handleExceptions: true,
      handleRejections: true,
    })
  ]
});