import { ApiProvider } from "lib-api";
import { getClarinetAccounts } from "lib-infra";
import {
  ClarinetAccount,
  getRootDirectory,
  Logger,
  NodeContractInstance,
} from "lib-shared";
import { NETWORK } from "taral-configuration";
import { nodeTaralContracts, TaralOracleContract } from "taral-contracts";

interface IOracleContractInfo {
  contract: NodeContractInstance<
    (account: ClarinetAccount) => TaralOracleContract
  >;
  account: ClarinetAccount;
}

export async function getOracleContract(): Promise<IOracleContractInfo> {
  const root = `${getRootDirectory()}/packages/clarity`;
  const clarinetAccounts = await getClarinetAccounts(root);

  const deployer = clarinetAccounts.deployer;
  const deployed = await ApiProvider.fromContracts(
    false,
    nodeTaralContracts,
    NETWORK,
    {
      secretKey: deployer.privateKey,
      stacksAddress: deployer.address,
    },
  );

  Logger.debug("get-oracle", "Getting oracle contract from private testnet");

  return {
    account: deployer,
    contract: deployed.nodeTaralOracle,
  };
}
