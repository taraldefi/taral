import { parse } from "@ltd/j-toml";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { ClarinetConfig } from ".";

export async function getClarinetConfig(folder: string) {
  const baseConfigPath = resolve(folder, "Clarinet.toml");
  const configContents = await readFile(baseConfigPath, { encoding: "utf-8" });
  const config = parse(
    configContents,
    1.0,
    "\n",
    false
  ) as unknown as ClarinetConfig;
  return config;
}
