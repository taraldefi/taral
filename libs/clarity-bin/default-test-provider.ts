import { NativeClarityBinProvider } from "./native-provider";
import { getDefaultBinaryFilePath, getTempFilePath } from "./utils";

export async function createDefaultTestProvider() {
    const binFile = getDefaultBinaryFilePath();
    const dbFileName = getTempFilePath();
    const provider = NativeClarityBinProvider.create([], dbFileName, binFile);

    return provider;
}
