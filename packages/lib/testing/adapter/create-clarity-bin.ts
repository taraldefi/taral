import {
  getDefaultBinaryFilePath,
  getTempFilePath,
  NativeClarityBinProvider,
} from "lib-clarity-bin";
import { AllocationOrAccounts } from "lib-shared";
import getAllocations from "./get-allocations";

export async function createClarityBin({
  allocations,
  testnet = true,
}: { allocations?: AllocationOrAccounts; testnet?: boolean  } = {}) {
  const binFile = getDefaultBinaryFilePath();
  const dbFileName = getTempFilePath();
  const _allocations = getAllocations(allocations);
  const provider = await NativeClarityBinProvider.create(
    _allocations,
    dbFileName,
    binFile
  );
  return provider;
}
