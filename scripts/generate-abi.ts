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
}
