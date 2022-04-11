import { Command } from "commander";
import { addSourceCommand } from "./commands/add-source-command";
import { checkPricesCommand } from "./commands/check-prices-command";
import { checkSourcesCommand } from "./commands/check-sources-command";
import { feedOraclePricesCommand } from "./commands/feed-oracle-prices-command";
import { revokeSourceCommand } from "./commands/revoke-source-command";
import { updatePricesCommand } from "./commands/update-prices-command";

const program = new Command();

program.command("add-source").action(async () => {
  await addSourceCommand();
});

program.command("check-prices").action(async () => {
  await checkPricesCommand();
});

program.command("check-sources").action(async () => {
  await checkSourcesCommand();
});

program.command("feed-oracle-prices").action(async () => {
  await feedOraclePricesCommand();
});

program.command("revoke-source").action(async () => {
  await revokeSourceCommand();
});

program.command("update-prices").action(async () => {
  await updatePricesCommand();
});

program.parse(process.argv);
