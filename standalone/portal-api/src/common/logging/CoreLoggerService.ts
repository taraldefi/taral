/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable, LoggerService} from "@nestjs/common";
import * as winston from 'winston';
import {SeqTransport} from "@datalust/winston-seq";
import { Configuration } from "src/configuration";
import DailyRotateFile from 'winston-daily-rotate-file';

import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import path from "path";

export const LEVEL_COLORS = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "blue",
    debug: "white",
    verbose: "cyan",
}

@Injectable()
export default class CoreLoggerService implements LoggerService {
    private logger: winston.Logger;

    constructor() {

        const seqConfig = Configuration.seqConfig;
        const logLevel = Configuration.logging.level;
        const appName = Configuration.app.name;
        const isDevelopment = Configuration.app.nodeEnv === "development";

        const seqTransport = new SeqTransport({
            serverUrl: seqConfig.url,
            apiKey: seqConfig.apiKey,
            format: winston.format.combine(
                /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
                winston.format.errors({stack: true}),
                winston.format.json(),
                nestWinstonModuleUtilities.format.nestLike('Taral Logger', {
                    prettyPrint: true,
                  }),
            ),
            handleExceptions: true,
            handleRejections: true,
            onError: (e) => {
                console.error(e);
            },
        });
        const consoleTransportInstance = new winston.transports.Console({
            format : winston.format.combine(
                      winston.format.colorize({ all: true }),
                      /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
                      winston.format.errors({stack: true}),
                      winston.format.json(),
                      nestWinstonModuleUtilities.format.nestLike('Taral Logger', {
                        prettyPrint: true,
                      }),
                  ),
        });

        const rotateDirectory = Configuration.logging.rotateDirectory;
        const absolutePathRotateDirectory = path.resolve(`./${rotateDirectory}`);

        const rotateTransport = new DailyRotateFile({
            dirname: absolutePathRotateDirectory,
            filename: "%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d",
        });

        winston.addColors(LEVEL_COLORS);
        this.logger = winston.createLogger({
            defaultMeta: {["ApplicationName"]: appName},
            level: isDevelopment
                ? "debug"
                : "info",
            transports: [seqTransport, consoleTransportInstance, rotateTransport],
        });
    }

    log(message: any, ...optionalParams: any[]) {
        if (typeof message === "string") {
            this.logger.info(message, ...optionalParams);
        } else {
            this.logger.info("obj: ", ...[message, optionalParams]);
        }
    }

    error(message: any, ...optionalParams: any[]) {
        if (typeof message === "string") {
            this.logger.error(message, ...optionalParams);
        } else {
            this.logger.error("obj: ", ...[message, optionalParams]);
        }
    }

    warn(message: any, ...optionalParams: any[]) {
        if (typeof message === "string") {
            this.logger.warn(message, ...optionalParams);
        } else {
            this.logger.warn("obj: ", ...[message, optionalParams]);
        }
    }

    debug(message: any, ...optionalParams: any[]) {
        if (typeof message === "string") {
            this.logger.debug(message, ...optionalParams);
        } else {
            this.logger.debug("obj: ", ...[message, optionalParams]);
        }
    }

    verbose(message: any, ...optionalParams: any[]) {
        if (typeof message === "string") {
            this.logger.debug(message, ...optionalParams);
        } else {
            this.logger.debug("obj: ", ...[message, optionalParams]);
        }
    }
}
