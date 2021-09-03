import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import { Logger } from "../logger";
import { BlockCvType, BlockPartsType, ProofCvType } from "./types";

export interface WasTxMinedRequest extends ClarityBitcoinRequest {
    blockPartsCV: BlockPartsType;
    txCV: Buffer;
    proofCV: ProofCvType;
}

export interface WasTxMinedFromHexRequest extends ClarityBitcoinRequest {
    blockCV: BlockCvType;
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

export async function wasTxMinedFromHex(request: WasTxMinedFromHexRequest): Promise<boolean> {
    // Call readonly function
    //
    let response = await request.contract.wasTxMinedCompact(
        request.blockCV,
        request.txCV,
        request.proofCV,
        getMetadata('readonly', request));

    let result = response._unsafeUnwrap();

    Logger.debug(`was-tx-mined-compact result: ${result}`);

    return result;
}
