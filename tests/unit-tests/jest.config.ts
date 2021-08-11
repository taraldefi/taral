const { resolve } = require("path");

const rootForUnitTests = resolve(__dirname, "../../");
const rootConfigForUnitTests = require(`${rootForUnitTests}/jest.config.js`);

module.exports = {
  ...rootConfigForUnitTests,
  rootDir: rootForUnitTests,
  displayName: "UNIT TESTS::",
  setupFilesAfterEnv: ["<rootDir>/tests/unit-tests/jest-setup.ts"],
  testMatch: ["<rootDir>/tests/unit-tests/**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
