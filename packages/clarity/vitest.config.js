/// <reference types="vitest" />

import { defineConfig } from "vite";
import { getClarinetVitestsArgv } from "@hirosystems/clarinet-sdk/vitest";

const vitestSetupFilePath = "../../node_modules/@hirosystems/clarinet-sdk/vitest-helpers/src/vitest.setup.ts";

console.log(vitestSetupFilePath);
export default defineConfig({
  test: {
    environment: "clarinet",
    singleThread: true,
    setupFiles: [vitestSetupFilePath],
    environmentOptions: {
      clarinet: getClarinetVitestsArgv(),
    },
  },
});
