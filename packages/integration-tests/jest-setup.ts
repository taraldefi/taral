import {
  ClarinetAccount,
  ClarinetAccounts,
  Contract,
  ContractInstances,
  getClarinetAccounts,
  getRootDirectory,
  Logger,
} from "lib-shared";
import { ApiProvider } from "lib-testing";
import { NETWORK } from "taral-configuration";
import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
  NftTraitContract,
  Sip10FtStandardContract,
  TaralCoinContract,
  taralContracts,
} from "taral-contracts";

export let talToken: (account: ClarinetAccount) => TaralCoinContract;
export let clarityBitcoinContract: (
  account: ClarinetAccount
) => ClarityBitcoinContract;
export let btcFtSwapContract: (account: ClarinetAccount) => BtcFtSwapContract;
export let clarinetAccounts: ClarinetAccounts;

export let deployed: ContractInstances<
  {
    sip10FtStandard: Contract<Sip10FtStandardContract>;
    nftTrait: Contract<NftTraitContract>;
    taralCoin: Contract<TaralCoinContract>;
    clarityBitcoin: Contract<ClarityBitcoinContract>;
    btcFtSwap: Contract<BtcFtSwapContract>;
    btcNftSwap: Contract<BtcNftSwapContract>;
  },
  unknown
>;

beforeAll(async () => {
  const root = `${getRootDirectory()}/packages/clarity`;
  clarinetAccounts = await getClarinetAccounts(root);

  var deployer = clarinetAccounts.deployer;

  // Comment out for now the core and arkadiko contracts untill we'll need them
  // await ApiProvider.fromContracts(true, arkadikoContracts, network, {
  //   secretKey: deployer.privateKey,
  //   stacksAddress: deployer.address,
  // });

  deployed = await ApiProvider.fromContracts(false, taralContracts, NETWORK, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  Logger.debug("jest-setup", "Deployed contracts to priv. testnet");
  talToken = deployed.taralCoin.contract;
  clarityBitcoinContract = deployed.clarityBitcoin.contract;
  btcFtSwapContract = deployed.btcFtSwap.contract;
}, 3000000);
