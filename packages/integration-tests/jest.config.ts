export { };

const { resolve } = require("path");
const rootForIntegrationTests = resolve(__dirname);

module.exports = {
    rootDir: rootForIntegrationTests,
    displayName: "[Taral integration tests]",
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    testMatch: ["<rootDir>/**/*.test.ts"],
    restoreMocks: true,
    clearMocks: true,
    resetMocks: true,
    preset: "ts-jest",
    testEnvironment: "node",
};
