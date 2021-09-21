const { resolve } = require("path");

const root = resolve(__dirname);

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.test.ts"],
  clearMocks: true,
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "<rootDir>/generated/taral/**/*.ts",
  //   "!<rootDir>/jest-tests/unit-tests/**/*.test.ts",
  //   "!<rootDir>/jest-tests/utils-tests/**/*.test.ts",
  // ],
  // coverageReporters: ["text-summary", "lcov"],
  // coverageDirectory: "coverage",
  // moduleNameMapper: {
  //   "^@contracts/(.*)$": "<rootDir>/clarity/generated/$1",
  // },
};
