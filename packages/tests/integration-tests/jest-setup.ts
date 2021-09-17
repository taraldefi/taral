import { NETWORK } from "taral-configuration";
import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
  taralContracts,
  NftTraitContract,
  Sip10FtStandardContract,
  TaralCoinContract,
} from "taral-generated-contracts";
import { Contract, ContractInstances } from "taral-shared";
import {
  ClarinetAccount,
  ClarinetAccounts,
  getClarinetAccounts,
} from "taral-shared";
import { Logger } from "taral-shared";
import { ApiProvider } from "taral-shared";

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
  jest.setTimeout(3000000);
  const cwd = `${process.cwd()}/clarity/`;
  clarinetAccounts = await getClarinetAccounts(cwd);
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

  Logger.debug("Deployed contracts to priv. testnet");
  talToken = deployed.taralCoin.contract;
  clarityBitcoinContract = deployed.clarityBitcoin.contract;
  btcFtSwapContract = deployed.btcFtSwap.contract;
});
