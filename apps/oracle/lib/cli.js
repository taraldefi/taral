'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const commander_1 = require('commander');
const packageJson = require('../package.json');
const version = packageJson.version;
const program = new commander_1.Command();
program
  .version(version)
  .name('my-command')
  .option('-d, --debug', 'enables verbose logging', false)
  .parse(process.argv);
// Function code for CLI goes here
