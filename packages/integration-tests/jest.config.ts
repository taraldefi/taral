export {};

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
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
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
