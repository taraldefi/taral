import { resolve } from "path";
import { readFile } from "fs/promises";
import { parse } from "@ltd/j-toml";
import { ClarinetDevConfig } from ".";

export async function getClarinetDevConfig(
  folder: string
): Promise<ClarinetDevConfig> {
  const baseConfigPath = resolve(folder, "settings", "Development.toml");
  const configContents = await readFile(baseConfigPath, { encoding: "utf-8" });
  const config = parse(
    configContents,
    1.0,
    "\n",
    false
  ) as unknown as ClarinetDevConfig;
  return config;
}

export async function getClarinetTestnetConfig(
  folder: string
): Promise<ClarinetDevConfig> {
  const baseConfigPath = resolve(folder, "settings", "Testnet.toml");
  const configContents = await readFile(baseConfigPath, { encoding: "utf-8" });
  const config = parse(
    configContents,
    1.0,
    "\n",
    false
  ) as unknown as ClarinetDevConfig;
  return config;
}
