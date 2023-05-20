import { parse } from "@ltd/j-toml";
import { readFileSync } from "fs";
import { ClarinetConfig } from "lib-shared";
import { resolve } from "path";

export function getClarinetConfig(folder: string) {
    const baseConfigPath = resolve(folder, "Clarinet.toml");
    const configContents = readFileSync(baseConfigPath, { encoding: "utf-8" });
    const config = parse(configContents, 1.0, "\n", true, {
        longer: true,
    }) as unknown as ClarinetConfig;
    return config;
}
