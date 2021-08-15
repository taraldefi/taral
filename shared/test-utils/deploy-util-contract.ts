import { Client, NativeClarityBinProvider } from "@blockstack/clarity";
import { join } from "path";
import { deployContract } from "../adapter";

export const UTIL_CONTRACT_ID = "ST000000000000000000002AMW42H.test-utils";

export async function deployUtilContract(
    clarityBin: NativeClarityBinProvider,
    subFolder: string
) {
    let contractFilePath = join(
        __dirname,
        "..",
        "..",
        "contracts",
        subFolder,
        "test-utils.clar"
    );
    if (__dirname.includes("dist")) {
        contractFilePath = join(
            __dirname,
            "..",
            "contracts",
            subFolder,
            "test-utils.clar"
        );
    }
    const client = new Client(UTIL_CONTRACT_ID, contractFilePath, clarityBin);
    await deployContract(client, clarityBin);
}
