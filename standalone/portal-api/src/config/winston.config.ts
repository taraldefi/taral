import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { WinstonModuleOptions } from 'nest-winston';
import { Configuration } from '../configuration';
import { SeqTransport } from '@datalust/winston-seq';

// const isProduction = Configuration.app.nodeEnv === 'production';
// const winstonConfig = Configuration.winston;
const seqConfig = Configuration.seqConfig;
const logLevel = Configuration.logging.level;

export default {
  format: winston.format.colorize(),
  exitOnError: false,
  transports: [
    new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike('Taral Logger', {
                prettyPrint: true,
              }),
            ),
          }),
    new winston.transports.File({ filename: 'error.log', level: logLevel }),
    new SeqTransport({
      serverUrl: seqConfig.url,
      apiKey: seqConfig.apiKey,
      onError: (e => { 
        console.log("SFKFJHDKJFHDKJFHD transport error");
        console.error(e); 
      }),
      handleExceptions: true,
      handleRejections: true,
    })
  ]
  // transports: isProduction
  //   ? new WinstonCloudWatch({
  //       name: 'Taral',
  //       awsOptions: {
  //         credentials: {
  //           accessKeyId:
  //             process.env.AWS_ACCESS_KEY || winstonConfig.awsAccessKeyId,
  //           secretAccessKey:
  //             process.env.AWS_KEY_SECRET || winstonConfig.awsSecretAccessKey,
  //         },
  //       },
  //       logGroupName:
  //         process.env.CLOUDWATCH_GROUP_NAME || winstonConfig.groupName,
  //       logStreamName:
  //         process.env.CLOUDWATCH_STREAM_NAME || winstonConfig.streamName,
  //       awsRegion: process.env.CLOUDWATCH_AWS_REGION || winstonConfig.awsRegion,
  //       messageFormatter: function (item) {
  //         return (
  //           item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
  //         );
  //       },
  //     })
  //   : new winston.transports.Console({
  //       format: winston.format.combine(
  //         winston.format.timestamp(),
  //         winston.format.ms(),
  //         nestWinstonModuleUtilities.format.nestLike('Taral Logger', {
  //           prettyPrint: true,
  //         }),
  //       ),
  //     }),
} as WinstonModuleOptions;
