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
  transform: {
    // Use babel-jest to transpile tests with the @babel/preset-typescript preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },
};
