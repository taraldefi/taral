import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";

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
    let result = await request.contract.wasTxMined(
        request.blockPartsCV, 
        request.txCV, 
        request.proofCV, 
        getMetadata('readonly', request));

    console.log('was-tx-mined', result.toString());

    let wasTxMinedResult =  result._unsafeUnwrap();

    return wasTxMinedResult;
}