import { parse } from "@ltd/j-toml";
import { readFile } from "fs/promises";
import { ClarinetConfig } from "lib-shared";
import { resolve } from "path";

export async function getClarinetConfig(folder: string) {
  const baseConfigPath = resolve(folder, "Clarinet.toml");
  const configContents = await readFile(baseConfigPath, { encoding: "utf-8" });
  const config = parse(configContents, 1.0, "\n", true, {
    longer: true,
  }) as unknown as ClarinetConfig;
  return config;
}
