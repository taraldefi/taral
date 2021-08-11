const { resolve } = require("path");

const root = resolve(__dirname, "../../");
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {
  ...rootConfig,
  rootDir: root,
  displayName: "TESTS::",
  setupFilesAfterEnv: ["<rootDir>/tests/unit-tests/jest-setup.ts"],
  testMatch: ["<rootDir>/tests/unit-tests/**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
