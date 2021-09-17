import { ClarityBitcoinContract } from "taral-generated-contracts";
import { Logger } from "../logger";

export async function parseTx({ txCV, contract }: { txCV: Buffer; contract: ClarityBitcoinContract }): Promise<string> {
    Logger.debug("Calling getTxid");

    let result: string = "";

    try {
        // Call readonly function
        //
        let response = await contract.getTxid(txCV);
        result = response.toString();
    } catch (error) {
        Logger.error(`parse-tx failed: ${(error as any).toString()}`);
    }

    Logger.debug("getTxid result");
    Logger.debug(JSON.stringify(result));
    Logger.debug("---------------");

    return result;
}
