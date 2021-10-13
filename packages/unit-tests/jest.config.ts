export {};

const { resolve } = require("path");

const rootForUnitTests = resolve(__dirname);

module.exports = {
  rootDir: rootForUnitTests,
  displayName: "[Taral unit tests]",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testMatch: ["<rootDir>/**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
  testEnvironment: "node",
  preset: "ts-jest",
};
