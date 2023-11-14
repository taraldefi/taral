import { ColorfulChalk } from "./color";

export class Level {
  public static valueOf(levelName: string): Level | undefined {
    return Level.levels.get(levelName.toLowerCase());
  }

  private static currentRank = 0; // rank increase counter
  private static readonly levels = new Map<string, Level>();

  public readonly rank: number; // level's rank
  public readonly desc: string; // level's description
  public readonly headerChalk: ColorfulChalk;
  public readonly contentChalk: ColorfulChalk;

  constructor(
    keys: string[],
    desc: string,
    headerChalk: ColorfulChalk,
    contentChalk: ColorfulChalk,
  ) {
    Level.currentRank += 1;
    this.rank = Level.currentRank;
    this.desc = desc;
    this.headerChalk = headerChalk;
    this.contentChalk = contentChalk;

    for (const key of keys) {
      Level.levels.set(key, this);
    }
  }
}

export const DEBUG = new Level(
  ["debug"],
  "debug",
  new ColorfulChalk("#BCA21F"),
  new ColorfulChalk("#BCA21F"),
);
export const VERBOSE = new Level(
  ["verbo", "verbose"],
  "verbo",
  new ColorfulChalk("#72C9CC"),
  new ColorfulChalk("#72C9CC"),
);
export const INFO = new Level(
  ["info", "information"],
  "info",
  new ColorfulChalk("#00FF00"),
  new ColorfulChalk("#00FF00"),
);
export const WARN = new Level(
  ["warn", "warning"],
  "warn",
  new ColorfulChalk("#FFA195"),
  new ColorfulChalk("#FFA195"),
);
export const ERROR = new Level(
  ["error"],
  "error",
  new ColorfulChalk("red"),
  new ColorfulChalk("red"),
);
export const FATAL = new Level(
  ["fatal"],
  "fatal",
  new ColorfulChalk("black", "red"),
  new ColorfulChalk("redBright"),
);
