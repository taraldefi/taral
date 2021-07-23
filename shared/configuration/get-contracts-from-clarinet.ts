import { ClarinetAccounts, ConfigContract, getClarinetConfig } from ".";

export async function getContractsFromClarinet(
  folder: string,
  accounts: ClarinetAccounts
): Promise<ConfigContract[]> {
  const clarinetConfig = await getClarinetConfig(folder);
  const deployerAddress = accounts.deployer.address;
  const contracts: ConfigContract[] = Object.entries(
    clarinetConfig.contracts
  ).map(([_contractName, info]) => {
    const file = info.path.replace(/^contracts\//, "");
    return {
      file,
      address: deployerAddress,
    };
  });
  return contracts;
}
