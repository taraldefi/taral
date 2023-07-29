export {};

const { resolve } = require("path");

const rootForUnitTests = resolve(__dirname);

module.exports = {
  rootDir: rootForUnitTests,
  displayName: "[Oracle unit tests]",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testMatch: ["**/__tests__/**/*.spec.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/__tests__/**/*.ts",
    "!<rootDir>/src/types/**/*.ts",
    "!<rootDir>/src/cli.ts",
  ],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
  testEnvironment: "node",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
