export {};

const { resolve } = require("path");
const rootForIntegrationTests = resolve(__dirname, "../../");
const rootConfigForIntegrationTests = require(`${rootForIntegrationTests}/jest.config.js`);

module.exports = {
  ...rootConfigForIntegrationTests,
  rootDir: rootForIntegrationTests,
  displayName: "INTEGRATION TESTS::",
  setupFilesAfterEnv: ["<rootDir>/jest-integration-tests/jest-setup.ts"],
  testMatch: ["<rootDir>/jest-tests/integration-tests/**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
