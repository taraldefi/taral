import { ClarinetAccounts } from "lib-shared";
import { NativeClarityBinProvider } from "lib-clarity-bin";
import { createClarityBin } from "lib-shared";

export async function getDefaultClarityBin(
  clarityBinOrAccounts?: NativeClarityBinProvider | ClarinetAccounts
): Promise<NativeClarityBinProvider> {
  let clarityBin: NativeClarityBinProvider;
  if (!clarityBinOrAccounts) {
    clarityBin = await createClarityBin();
  } else if ("deployer" in clarityBinOrAccounts) {
    clarityBin = await createClarityBin({ allocations: clarityBinOrAccounts });
    // } else if ('closeActions' in clarityBinOrAccounts) {
  } else if (clarityBinOrAccounts instanceof NativeClarityBinProvider) {
    clarityBin = clarityBinOrAccounts;
  } else {
    throw new Error("Should never get here");
  }
  return clarityBin;
}
