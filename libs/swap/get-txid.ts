import { Logger } from "lib-shared";
import { ClarityBitcoinContract } from "taral-contracts";

export async function getTxId({
    txBuffCV,
    contract,
}: {
    txBuffCV: Buffer;
    contract: ClarityBitcoinContract;
}): Promise<string> {
    // Call readonly function
    //
    const response = await contract.getTxid(txBuffCV);

    const result = response.toString();

    Logger.debug("get-tx-id", "Received result ", response);
    return result;
}

export async function getReversedTxId({
    txCv,
    contract,
}: {
    txCv: Buffer;
    contract: ClarityBitcoinContract;
}): Promise<string> {
    // Call readonly function
    //
    const response = await contract.getReversedTxid(txCv);

    const result = response.toString();

    Logger.debug("get-reversed-tx-id", "Received result ", response);
    return result;
}
