"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
describe("oracle", () => {
  it("should display the help contents", () => {
    const { stdout } = (0, helpers_1.runCLI)(process.cwd(), ["--help"]);
    expect(stdout).toContain("Usage: oracle [options]");
  });
});
