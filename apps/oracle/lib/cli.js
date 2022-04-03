"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program.command('hello').action(() => {
    console.log('hello there');
});
program.command('bye').action(() => {
    console.log('bye there');
});
program.parse(process.argv);
