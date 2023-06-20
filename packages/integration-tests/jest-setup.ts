import { ApiProvider } from "lib-api";
import { getClarinetAccounts } from "lib-infra";
import {
    ClarinetAccount,
    ClarinetAccounts,
    getRootDirectory,
    Logger,
    NodeContract,
    NodeContractInstances
} from "lib-shared";
import { NETWORK } from "taral-configuration";
import {
    BtcFtSwapContract,
    BtcNftSwapContract,
    ClarityBitcoinContract,
    NftTraitContract,
    nodeTaralContracts,
    FtTraitContract,
    TaralCoinContract,
    StorageServiceContract
} from "taral-contracts";

export let talToken: (account: ClarinetAccount) => TaralCoinContract;

export let taralStorage: (account: ClarinetAccount) => StorageServiceContract;

export let clarityBitcoinContract: (
    account: ClarinetAccount
) => ClarityBitcoinContract;
export let btcFtSwapContract: (account: ClarinetAccount) => BtcFtSwapContract;
export let clarinetAccounts: ClarinetAccounts;

export let deployed: NodeContractInstances<
    {
        nodeFtTrait: NodeContract<FtTraitContract>;
        nodeNftTrait: NodeContract<NftTraitContract>;
        nodeTaralCoin: NodeContract<TaralCoinContract>;
        nodeClarityBitcoin: NodeContract<ClarityBitcoinContract>;
        nodeBtcFtSwap: NodeContract<BtcFtSwapContract>;
        nodeBtcNftSwap: NodeContract<BtcNftSwapContract>;
        nodeStorageService: NodeContract<StorageServiceContract>;
    },
    unknown
>;

beforeAll(async () => {
    const root = `${getRootDirectory()}/packages/clarity`;
    clarinetAccounts = await getClarinetAccounts(root);

    const deployer = clarinetAccounts.deployer;

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
    taralStorage = deployed.nodeStorageService.contract;
    clarityBitcoinContract = deployed.nodeClarityBitcoin.contract;
    btcFtSwapContract = deployed.nodeBtcFtSwap.contract;
}, 3000000);
