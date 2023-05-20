import { parse } from "@ltd/j-toml";
import { readFileSync } from "fs";
import { ClarinetDevConfig } from "lib-shared";
import { resolve } from "path";

export function getClarinetDevConfig(folder: string): ClarinetDevConfig {
    const baseConfigPath = resolve(folder, "settings", "Devnet.toml");
    const configContents = readFileSync(baseConfigPath, { encoding: "utf-8" });
    const config = parse(
        configContents,
        1.0,
        "\n",
        false
    ) as unknown as ClarinetDevConfig;
    return config;
}
