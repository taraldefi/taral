import type { Chalk } from "chalk";
import chalk from "chalk";

export type Color = string | [number, number, number];

const colorKeywords = new Set([
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
]);

const brightColorKeywords = new Set([
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright",
]);

export function colorToChalk(color: Color, fg: boolean): Chalk {
  if (typeof color === "string") {
    if (colorKeywords.has(color) || brightColorKeywords.has(color)) {
      if (!fg) {
        // eslint-disable-next-line no-param-reassign
        color = "bg" + color[0].toUpperCase() + color.slice(1);
      }
      return (chalk as any)[color].bind(chalk);
    }
    try {
      return fg ? chalk.keyword(color) : chalk.bgKeyword(color);
    } catch (error) {
      return fg ? chalk.hex(color) : chalk.bgHex(color);
    }
  }
  return fg
    ? chalk.rgb(color[0], color[1], color[2])
    : chalk.bgRgb(color[0], color[1], color[2]);
}

export class ColorfulChalk {
  public readonly fg: Chalk;
  public readonly bg: Chalk | null;

  constructor(fg: Color, bg?: Color) {
    this.fg = colorToChalk(fg, true);
    if (bg == null) this.bg = null;
    else this.bg = colorToChalk(bg, false);
  }
}
