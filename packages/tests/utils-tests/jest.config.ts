export { };

const { resolve } = require("path");

const rootForUtilsTests = resolve(__dirname, "../");
const rootConfigForUtilsTests = require(`${rootForUtilsTests}/jest.config.js`);

module.exports = {
    ...rootConfigForUtilsTests,
    rootDir: rootForUtilsTests,
    displayName: "UTILITIES UNIT TESTS::",
    setupFilesAfterEnv: ["<rootDir>/utils-tests/jest-setup.ts"],
    testMatch: ["<rootDir>/utils-tests/**/*.test.ts"],
    restoreMocks: true,
    clearMocks: true,
    resetMocks: true,
};
