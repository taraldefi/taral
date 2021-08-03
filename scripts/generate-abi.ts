import { generateFilesForContract } from "../shared/abi";
import { CONTRACTS, GENERATION_FOLDER } from "./contracts";
import { ADDR1 } from "../configuration";
import { NativeClarityBinProvider } from "@blockstack/clarity";
import { createDefaultTestProvider } from "../shared/default-test-provider";
import { contractWithSubDirectory } from "../shared/utils/contract-with-subdirectory";

async function generateAbiFilesForContract(
  contract: CONTRACTS,
  address: string,
  provider: NativeClarityBinProvider
) {
  await generateFilesForContract({
    contractFile: contractWithSubDirectory(contract),
    outputFolder: GENERATION_FOLDER,
    contractAddress: address,
    provider,
  });
}

export async function generateAbis(): Promise<void> {
  const provider = await createDefaultTestProvider();

  // await deploy({
  //   contractFile: contractWithSubDirectory('sip-10-ft-standard'),
  //   contractAddress: DEPLOYER_ADDRESS,
  //   provider
  // });

  // await deploy({
  //   contractFile: contractWithSubDirectory('simple-counter'),
  //   contractAddress: DEPLOYER_ADDRESS,
  //   provider
  // });

  // await deploy({
  //   contractFile: contractWithSubDirectory('counter-coin'),
  //   contractAddress: DEPLOYER_ADDRESS,
  //   provider
  // });

  // await deploy({
  //   contractFile: contractWithSubDirectory('counter'),
  //   contractAddress: DEPLOYER_ADDRESS,
  //   provider
  // });

  await generateAbiFilesForContract("sip-10-ft-standard", ADDR1, provider);
  await generateAbiFilesForContract("simple-counter", ADDR1, provider);
  await generateAbiFilesForContract("counter-coin", ADDR1, provider);
  await generateAbiFilesForContract("counter", ADDR1, provider);

  await generateAbiFilesForContract('sip-010-trait-ft-standard', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-oracle-trait-v1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-collateral-types-trait-v1', ADDR1, provider);

  await generateAbiFilesForContract('arkadiko-vault-trait-v1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-vault-manager-trait-v1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-dao-token-trait-v1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-auction-engine-trait-v1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stake-registry-trait-v1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stake-pool-trait-v1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-swap-trait-v1', ADDR1, provider);

  await generateAbiFilesForContract('arkadiko-token', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-dao', ADDR1, provider);

  await generateAbiFilesForContract('stdiko-token', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-collateral-types-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-oracle-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('wrapped-stx-token', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-governance-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-diko-guardian-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-swap-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-diko-init', ADDR1, provider);

  await generateAbiFilesForContract('usda-token', ADDR1, provider);
  await generateAbiFilesForContract('xstx-token', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-swap-token-diko-usda', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-swap-token-wstx-usda', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-swap-token-wstx-diko', ADDR1, provider);

  await generateAbiFilesForContract('arkadiko-vault-data-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-vault-rewards-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stx-reserve-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-sip10-reserve-v1-1', ADDR1, provider);

  await generateAbiFilesForContract('pox', ADDR1, provider);

  await generateAbiFilesForContract('arkadiko-freddie-v1-1', ADDR1, provider);

  await generateAbiFilesForContract('arkadiko-stacker-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stake-registry-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stake-pool-diko-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stake-pool-diko-usda-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stake-pool-wstx-usda-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-stake-pool-wstx-diko-v1-1', ADDR1, provider);

  await generateAbiFilesForContract('arkadiko-auction-engine-v1-1', ADDR1, provider);
  await generateAbiFilesForContract('arkadiko-liquidator-v1-1', ADDR1, provider);
}
