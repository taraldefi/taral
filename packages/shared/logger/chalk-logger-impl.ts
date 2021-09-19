import { ChalkLogger, LoggerOptions } from "./chalk-logger";
import { Level } from "./level";
import { Writeable } from "./types";

export class ChalkLoggerImpl extends ChalkLogger {
  /**
   * prefix of logger.name
   */
  protected basename: string | null = null;
  /**
   * name passed into .setName()
   */
  protected divisionName: string | null = null;

  constructor(options?: LoggerOptions) {
    super({
      ...options,
    });
    const basename =
      options != null && options.name != null ? options.name : "";
    this.setBaseName(basename);
  }

  /**
   * update logger's level
   * @param level
   */
  public setLevel(level: Level | null | undefined): void {
    if (level == null) return;
    const self = this as Writeable<this>;
    self.level = level;
  }

  /**
   * update logger's name
   * @param name
   */
  public setName(name: string | null): void {
    const resolvedName: string = [this.basename, name]
      .filter((x): x is string => x != null && x.length > 0)
      .join(" ");
    const self = this as Writeable<this>;
    self.name = resolvedName;
    this.divisionName = name;
  }

  /**
   * update basename of logger
   * @param basename
   */
  public setBaseName(basename: string | null): void {
    this.basename = basename;
    this.setName(this.divisionName);
  }

  /**
   * update logger's mode
   * @param mode
   */
  public setMode(mode: "normal" | "loose"): void {
    const self = this as Writeable<this>;
    self.mode = mode;
  }
}

export default ChalkLoggerImpl;
