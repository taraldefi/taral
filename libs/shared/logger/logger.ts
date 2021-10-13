import { ChalkLoggerImpl } from "./chalk-logger-impl";
import { config } from "./config";
import { DEBUG, ERROR, FATAL, INFO, Level, WARN } from "./level";

const levels = ["debug", "info", "warn", "error", "none"];

const chalkLoggers: { [level: string]: ChalkLoggerImpl } = {};
const levelToInt: { [level: string]: number } = {};
const intToLevel: { [int: number]: string } = {};

for (let index = 0; index < levels.length; index++) {
  const level = levels[index];
  levelToInt[level] = index;
  intToLevel[index] = level;

  let loggerLevel: Level = FATAL;
  switch (level) {
    case "debug": {
      loggerLevel = DEBUG;
      break;
    }
    case "info": {
      loggerLevel = INFO;
      break;
    }
    case "warn": {
      loggerLevel = WARN;
      break;
    }
    case "error": {
      loggerLevel = ERROR;
      break;
    }
  }

  chalkLoggers[level] = new ChalkLoggerImpl({
    name: "",
    level: loggerLevel, // the default value is FATAL
    date: true, // the default value is true.
    colorful: true, // the default value is true.
  });
}

/**
 * @ignore
 */
export class Logger {
  static error(name: string, message: string, ...optionalParams: any[]) {
    if (!this.shouldLog("error")) return;

    const logger = chalkLoggers["error"];

    logger.setName(name);
    logger.error(message, optionalParams);
  }

  static warn(name: string, message: string, ...optionalParams: any[]) {
    if (!this.shouldLog("warn")) return;

    const logger = chalkLoggers["warn"];

    logger.setName(name);
    logger.warn(message, optionalParams);
  }

  static info(name: string, message: string, ...optionalParams: any[]) {
    if (!this.shouldLog("info")) return;

    const logger = chalkLoggers["info"];

    logger.setName(name);
    logger.info(message, optionalParams);
  }

  static debug(name: string, message: string, ...optionalParams: any[]) {
    if (!this.shouldLog("debug")) return;

    const logger = chalkLoggers["debug"];

    logger.setName(name);
    logger.debug(message, optionalParams);
  }

  static logMessage(level: string, message: string) {
    return `[${level.toUpperCase()}] ${message}`;
  }

  static shouldLog(level: string) {
    const currentLevel = levelToInt[config.logLevel];
    return currentLevel <= levelToInt[level];
  }
}
