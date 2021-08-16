const { resolve } = require("path");

const root = resolve(__dirname);

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit-tests/**/*.test.ts"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/generated/taral/**/*.ts",
    "!<rootDir>/tests/unit-tests/**/*.test.ts",
  ],
  coverageReporters: ["text-summary", "lcov"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@contracts/(.*)$": "<rootDir>/clarity/generated/$1"
  },
};
