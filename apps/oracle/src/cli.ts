import { Command } from "commander";

const program = new Command();

program.command("hello").action(() => {
  console.log("hello there");
});

program.command("bye").action(() => {
  console.log("bye there");
});

program.parse(process.argv);
