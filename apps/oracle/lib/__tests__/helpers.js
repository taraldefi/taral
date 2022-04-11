"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnScript = exports.runCLI = void 0;
const path_1 = __importDefault(require("path"));
const execa_1 = __importDefault(require("execa"));
const chalk_1 = __importDefault(require("chalk"));
const TEST_CLI_PATH = path_1.default.resolve(__dirname, "./integration/bin.js");
/**
 * Helper function to run CLI command in a given folder
 */
function runCLI(
  dir,
  args,
  options = {
    expectedFailure: false,
  }
) {
  return (0, exports.spawnScript)(
    process.execPath,
    [TEST_CLI_PATH, ...(args || [])],
    Object.assign(Object.assign({}, options), { cwd: dir })
  );
}
exports.runCLI = runCLI;
const spawnScript = (execPath, args, options) => {
  const result = execa_1.default.sync(execPath, args, getExecaOptions(options));
  handleTestFailure(execPath, options, result, args);
  return result;
};
exports.spawnScript = spawnScript;
function getExecaOptions(options) {
  const isRelative = !path_1.default.isAbsolute(options.cwd);
  const cwd = isRelative
    ? path_1.default.resolve(__dirname, options.cwd)
    : options.cwd;
  const env = Object.assign({}, process.env, { FORCE_COLOR: "0" });
  if (options.nodeOptions) {
    env.NODE_OPTIONS = options.nodeOptions;
  }
  if (options.nodePath) {
    env.NODE_PATH = options.nodePath;
  }
  return {
    cwd,
    env,
    reject: false,
    timeout: options.timeout || 0,
  };
}
function handleTestFailure(cmd, options, result, args) {
  if (!options.expectedFailure && result.code !== 0) {
    console.log(`Running ${cmd} command failed for unexpected reason. Here's more info:
${chalk_1.default.bold("cmd:")}     ${cmd}
${chalk_1.default.bold("options:")} ${JSON.stringify(options)}
${chalk_1.default.bold("args:")}    ${(args || []).join(" ")}
${chalk_1.default.bold("stderr:")}  ${result.stderr}
${chalk_1.default.bold("stdout:")}  ${result.stdout}
${chalk_1.default.bold("code:")}    ${result.code}`);
  }
}
