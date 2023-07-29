import { getClarinetAccounts } from "lib-infra";
import { getRootDirectory, Logger } from "lib-shared";

const LOGGER_CATEGORY = "EVALUATE_CONTRACTS";

export async function evaluateContracts() {
  const root = `${getRootDirectory()}/packages/clarity`;
  const contracts = await getClarinetAccounts(root);
  Logger.debug(LOGGER_CATEGORY, "Contracts are:", contracts);
}
