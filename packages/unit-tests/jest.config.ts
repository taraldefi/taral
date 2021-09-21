export {};

const { resolve } = require("path");

const rootForUnitTests = resolve(__dirname);
const rootConfigForUnitTests = require(`${rootForUnitTests}/jest.config.js`);

module.exports = {
  ...rootConfigForUnitTests,
  rootDir: rootForUnitTests,
  displayName: "[Taral unit tests]",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testMatch: ["<rootDir>/**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
