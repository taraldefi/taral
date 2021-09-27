import {
  getDefaultBinaryFilePath,
  getTempFilePath,
  NativeClarityBinProvider,
} from "lib-clarity-bin";
import { AllocationOrAccounts } from "../types";
import getAllocations from "./get-allocations";

export async function createClarityBin({
  allocations,
}: { allocations?: AllocationOrAccounts } = {}) {
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
