export {};

const { resolve } = require("path");
const rootForIntegrationTests = resolve(__dirname);
const rootConfigForIntegrationTests = require(`${rootForIntegrationTests}/jest.config.js`);

module.exports = {
  ...rootConfigForIntegrationTests,
  rootDir: rootForIntegrationTests,
  displayName: "[Taral integration tests]",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testMatch: ["<rootDir>/**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
