import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";
import { Logger } from "../logger";

export type BlockPartsType = {
    "height": number;
    "merkle-root": Buffer;
    "nbits": Buffer;
    "nonce": Buffer;
    "parent": Buffer;
    "timestamp": Buffer;
    "version": Buffer
};

export type ProofCvType = {
    "hashes": Buffer[];
    "tree-depth": number;
    "tx-index": number
};

export interface WasTxMinedRequest extends ClarityBitcoinRequest {
    blockPartsCV: BlockPartsType;
    txCV: Buffer;
    proofCV: ProofCvType;
}

export async function wasTxMined(request: WasTxMinedRequest): Promise<boolean> {
    // Call readonly function
    //
    let response = await request.contract.wasTxMined(
        request.blockPartsCV,
        request.txCV,
        request.proofCV,
        getMetadata('readonly', request));

    let result = response._unsafeUnwrap();

    Logger.debug(`was-tx-mined result: ${result}`);

    return result;
}