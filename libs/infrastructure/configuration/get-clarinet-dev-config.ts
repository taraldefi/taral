import { parse } from "@ltd/j-toml";
import { readFile } from "fs/promises";
import { ClarinetDevConfig } from "lib-shared";
import { resolve } from "path";

export async function getClarinetDevConfig(
  folder: string
): Promise<ClarinetDevConfig> {
  const baseConfigPath = resolve(folder, "settings", "Devnet.toml");
  const configContents = await readFile(baseConfigPath, { encoding: "utf-8" });
  const config = parse(
    configContents,
    1.0,
    "\n",
    false
  ) as unknown as ClarinetDevConfig;
  return config;
}
