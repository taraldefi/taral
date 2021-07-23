import { Logger } from "../shared/logger";
import { getClarinetAccounts } from "../shared/configuration/get-clarinet-accounts";

test("Clarinet configuration sanity check", async () => {
  const cwd = process.cwd();
  var contracts = await getClarinetAccounts(cwd);

  for (var contract in contracts) {
    Logger.debug(`Contract: ${contract}`);
  }
});
