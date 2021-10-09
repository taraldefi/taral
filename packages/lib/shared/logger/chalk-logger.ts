import type { Chalk } from "chalk";
import chalk from "chalk";
import dayjs from "dayjs";
import { inspect } from "util";
import type { Color } from "./color";
import { colorToChalk } from "./color";
import type { Level } from "./level";
import { DEBUG, ERROR, FATAL, INFO, VERBOSE, WARN } from "./level";
import type { Writeable } from "./types";

export interface LoggerOptions {
  mode?: "normal" | "loose";
  placeholderRegex?: RegExp;
  name?: string;
  level?: Level;
  date?: boolean;
  title?: boolean;
  inline?: boolean;
  colorful?: boolean;
  encoding?: BufferEncoding;
  filepath?: string;
  write?(text: string): void;
  dateChalk?: Chalk | Color;
  nameChalk?: Chalk | Color;
}

export class ChalkLogger {
  private static get defaultLevel(): Level {
    return INFO;
  }
  private static get defaultDateChalk(): Chalk {
    return chalk.gray.bind(chalk);
  }
  private static get defaultNameChalk(): Chalk {
    return chalk.gray.bind(chalk);
  }

  public readonly name: string;
  public readonly mode: "normal" | "loose" = "normal";
  public readonly level = ChalkLogger.defaultLevel;
  public readonly write = (text: string): void => {
    process.stdout.write(text);
  };
  public readonly dateChalk = ChalkLogger.defaultDateChalk;
  public readonly nameChalk = ChalkLogger.defaultNameChalk;
  public readonly placeholderRegex: RegExp = /(?<!\\)\{\}/g;
  public readonly flags = {
    date: false,
    title: true,
    inline: false,
    colorful: true,
  };

  constructor(options?: LoggerOptions) {
    this.name = "";
    this.init(options);
  }

  public init(options?: LoggerOptions): void {
    if (!options) return;

    const self = this as Writeable<this>;

    if (options.name != null) {
      self.name = options.name;
    }
    const {
      mode,
      level,
      date,
      title,
      inline,
      colorful,
      write,
      filepath,
      encoding = "utf-8",
      dateChalk,
      nameChalk,
      placeholderRegex,
    } = options;

    // set log mode
    if (mode != null) self.mode = mode;

    // set log level
    if (level != null) self.level = level;

    // set flags
    if (date != null) self.flags.date = date;
    if (title != null) self.flags.title = title;
    if (inline != null) self.flags.inline = inline;
    if (colorful != null) self.flags.colorful = colorful;

    // set placeholderRegex
    if (placeholderRegex != null) {
      let flags: string = this.placeholderRegex.flags;
      if (!flags.includes("g")) flags += "g";
      self.placeholderRegex = new RegExp(placeholderRegex.source, `${flags}`);
    }

    // set log write function
    if (write != null) self.write = write;

    // set dateChalk
    if (dateChalk != null) {
      self.dateChalk =
        typeof dateChalk === "function"
          ? dateChalk
          : colorToChalk(dateChalk, true);
    }

    // set nameChalk
    if (nameChalk != null) {
      self.nameChalk =
        typeof nameChalk === "function"
          ? nameChalk
          : colorToChalk(nameChalk, true);
    }
  }

  // format a log record.
  public format(level: Level, header: string, message: string): string {
    if (this.flags.colorful) {
      // eslint-disable-next-line no-param-reassign
      message = level.contentChalk.fg(message);
      if (level.contentChalk.bg != null) {
        // eslint-disable-next-line no-param-reassign
        message = level.contentChalk.bg(message);
      }
    }

    return header.length > 0 ? header + " " + message : message;
  }

  // format a log record's header.
  public formatHeader(level: Level, date: Date): string {
    let dateInfo = "";
    if (this.flags.date) {
      const { dateChalk } = this;
      dateInfo = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      if (this.flags.colorful) dateInfo = dateChalk(dateInfo);
    }

    let title = "";
    if (this.flags.title) {
      let { desc } = level;
      const { name, nameChalk } = this;
      let chalkedName = name;
      if (this.flags.colorful) {
        desc = level.headerChalk.fg(desc);
        if (level.headerChalk.bg != null) desc = level.headerChalk.bg(desc);
        chalkedName = nameChalk(name as any);
      }
      title = name.length > 0 ? `${desc} ${chalkedName}` : desc;
      title = `[${title}]`;
    }

    if (dateInfo.length > 0) {
      if (title.length > 0) return dateInfo + " " + title;
      return dateInfo;
    }

    return title;
  }

  // format a log record part message according its type.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public formatSingleMessage(message: any): string {
    let text: string;
    const { inline } = this.flags;
    switch (typeof message) {
      case "boolean":
      case "number":
      case "string":
        text = "" + message;
        break;
      case "function":
        text = message();
        break;
      default:
        try {
          if (inline) text = inspect(message, false, null);
          else text = JSON.stringify(message, null, 2);
        } catch (error) {
          text = inspect(message, false, null);
        }
    }
    if (inline) text = text.replace(/\n\s*/g, " ");
    return text;
  }

  public debug(messageFormat: string, ...messages: any[]): void {
    this.log(DEBUG, messageFormat, ...messages);
  }

  public verbose(messageFormat: string, ...messages: any[]): void {
    this.log(VERBOSE, messageFormat, ...messages);
  }

  public info(messageFormat: string, ...messages: any[]): void {
    this.log(INFO, messageFormat, ...messages);
  }

  public warn(messageFormat: string, ...messages: any[]): void {
    this.log(WARN, messageFormat, ...messages);
  }

  public error(messageFormat: string, ...messages: any[]): void {
    this.log(ERROR, messageFormat, ...messages);
  }

  public fatal(messageFormat: string, ...messages: any[]): void {
    this.log(FATAL, messageFormat, ...messages);
  }

  // write a log record.
  public log(level: Level, messageFormat: string, ...messages: any[]): void {
    if (!level || level.rank < this.level.rank) return;
    const header = this.formatHeader(level, new Date());
    let newline = false;
    const items: string[] = messages.map((msg) => {
      if (msg == null) {
        // eslint-disable-next-line no-param-reassign
        msg = "" + msg;
      }
      let text = this.formatSingleMessage(msg);
      if (text.endsWith("\n")) {
        text = "\n" + text;
        newline = true;
      }
      return text;
    });

    let idx = 0;
    let message: string = messageFormat.replace(this.placeholderRegex, (m) => {
      // eslint-disable-next-line no-plusplus
      const value = items[idx++];
      return value === undefined ? m : value;
    });
    if (idx < items.length) message += " " + items.slice(idx).join(" ");
    if (!newline && !message.endsWith("\n")) message += "\n";

    switch (this.mode) {
      case "loose":
        this.write("\n" + this.format(level, header, message) + "\n");
        break;
      case "normal":
      default:
        this.write(this.format(level, header, message));
        break;
    }
  }
}
