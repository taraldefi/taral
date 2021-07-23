import { NativeClarityBinProvider } from "@blockstack/clarity";
import { getDefaultBinaryFilePath } from "@blockstack/clarity-native-bin";
import { getTempFilePath } from "@blockstack/clarity/lib/utils/fsUtil";

export async function createDefaultTestProvider() {
  const binFile = getDefaultBinaryFilePath();
  const dbFileName = getTempFilePath();
  const provider = await NativeClarityBinProvider.create(
    [],
    dbFileName,
    binFile
  );

  return provider;
}
