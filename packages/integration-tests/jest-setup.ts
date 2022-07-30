import { ApiProvider } from "lib-api";
import { getClarinetAccounts } from "lib-infra";
import {
  ClarinetAccount,
  ClarinetAccounts,
  getRootDirectory,
  Logger,
  NodeContract,
  NodeContractInstances,
} from "lib-shared";
import { NETWORK } from "taral-configuration";
import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
  NftTraitContract,
  nodeTaralContracts,
  Sip10FtStandardContract,
  TaralCoinContract,
  TaralStorageContract,
} from "taral-contracts";

export let talToken: (account: ClarinetAccount) => TaralCoinContract;

export let taralStorage: (account: ClarinetAccount) => TaralStorageContract;

export let clarityBitcoinContract: (
  account: ClarinetAccount
) => ClarityBitcoinContract;
export let btcFtSwapContract: (account: ClarinetAccount) => BtcFtSwapContract;
export let clarinetAccounts: ClarinetAccounts;

export let deployed: NodeContractInstances<
  {
    nodeSip10FtStandard: NodeContract<Sip10FtStandardContract>;
    nodeNftTrait: NodeContract<NftTraitContract>;
    nodeTaralCoin: NodeContract<TaralCoinContract>;
    nodeClarityBitcoin: NodeContract<ClarityBitcoinContract>;
    nodeBtcFtSwap: NodeContract<BtcFtSwapContract>;
    nodeBtcNftSwap: NodeContract<BtcNftSwapContract>;
    nodeTaralStorage: NodeContract<TaralStorageContract>;
  },
  unknown
>;

beforeAll(async () => {
  const root = `${getRootDirectory()}/packages/clarity`;
  clarinetAccounts = await getClarinetAccounts(root);

  const deployer = clarinetAccounts.deployer;

  // Comment out for now the core and arkadiko contracts untill we'll need them
  // await ApiProvider.fromContracts(true, arkadikoContracts, network, {
  //   secretKey: deployer.privateKey,
  //   stacksAddress: deployer.address,
  // });

  deployed = await ApiProvider.fromContracts(
    false,
    nodeTaralContracts,
    NETWORK,
    {
      secretKey: deployer.privateKey,
      stacksAddress: deployer.address,
    }
  );

  Logger.debug("jest-setup", "Deployed contracts to priv. testnet");
  talToken = deployed.nodeTaralCoin.contract;
  taralStorage = deployed.nodeTaralStorage.contract;
  clarityBitcoinContract = deployed.nodeClarityBitcoin.contract;
  btcFtSwapContract = deployed.nodeBtcFtSwap.contract;
}, 3000000);
