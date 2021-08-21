export {};

const { resolve } = require("path");

const rootForUtilsTests = resolve(__dirname, "../../");
const rootConfigForUtilsTests = require(`${rootForUtilsTests}/jest.config.js`);

module.exports = {
  ...rootConfigForUtilsTests,
  rootDir: rootForUtilsTests,
  displayName: "UTILITIES UNIT TESTS::",
  setupFilesAfterEnv: ["<rootDir>/tests/utils-tests/jest-setup.ts"],
  testMatch: ["<rootDir>/tests/utils-tests/**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
