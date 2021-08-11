const { resolve } = require("path");

const root = resolve(__dirname);

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit-tests/**/*.test.ts"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/taral/**/*.ts",
    "!<rootDir>/tests/unit-tests/**/*.test.ts",
  ],
  coverageReporters: ["text-summary", "lcov"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@contracts/(.*)$": "<rootDir>/src/$1",
    "^@contracts$": "<rootDir>/src/index",
  },
};
