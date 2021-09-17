export { };

const { resolve } = require("path");
const rootForIntegrationTests = resolve(__dirname, "../");
const rootConfigForIntegrationTests = require(`${rootForIntegrationTests}/jest.config.js`);

module.exports = {
    ...rootConfigForIntegrationTests,
    rootDir: rootForIntegrationTests,
    displayName: "INTEGRATION TESTS::",
    setupFilesAfterEnv: ["<rootDir>/integration-tests/jest-setup.ts"],
    testMatch: ["<rootDir>/integration-tests/**/*.test.ts"],
    restoreMocks: true,
    clearMocks: true,
    resetMocks: true,
};
