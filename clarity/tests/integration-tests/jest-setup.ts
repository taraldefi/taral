import { ContractInstances, Contract } from "clarity/lib";
import { NETWORK } from "../../configuration";
import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
  contracts as taralContracts,
  NftTraitContract,
  Sip10FtStandardContract,
  TaralCoinContract,
} from "../../generated/taral";
import { ClarinetAccounts, getClarinetAccounts } from "../../lib/configuration";
import { Logger } from "../../lib/logger";
import { ApiProvider } from "../../lib/providers";

export let talToken: TaralCoinContract;
export let clarityBitcoinContract: ClarityBitcoinContract; 
export let btcFtSwapContract: BtcFtSwapContract;
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

  deployed = await ApiProvider.fromContracts(true, taralContracts, NETWORK, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  Logger.debug("Deployed contracts to priv. testnet");
  talToken = deployed.taralCoin.contract;
  clarityBitcoinContract = deployed.clarityBitcoin.contract;
  btcFtSwapContract = deployed.btcFtSwap.contract;
});
