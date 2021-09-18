import { NativeClarityBinProvider } from "./native-cli/native-provider";
import { getDefaultBinaryFilePath, getTempFilePath } from "./native-cli/utils";

export async function createDefaultTestProvider() {
  const binFile = getDefaultBinaryFilePath();
  const dbFileName = getTempFilePath();
  const provider = NativeClarityBinProvider.create([], dbFileName, binFile);

  return provider;
}
