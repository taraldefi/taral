import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import { Logger } from "../logger";
import { makeBuffer } from "./utils";
import { BlockCvType } from "./types";

export interface VerifyBlockHeaderRequest extends ClarityBitcoinRequest {
    headerParts: string[];
    stacksBlockHeight: number;
}

export interface VerifyBlockHeader2Request extends ClarityBitcoinRequest {
    blockCV: BlockCvType;
}

export async function verifyBlockHeader(request: VerifyBlockHeaderRequest): Promise<boolean> {

    const summedUpHeaderParts = request.headerParts[0] + request.headerParts[1] + request.headerParts[2] + request.headerParts[3] + request.headerParts[4] + request.headerParts[5];
    const headerPartsBuffer = makeBuffer(summedUpHeaderParts);

    // Call readonly function
    //
    let response = await request.contract.verifyBlockHeader(
        headerPartsBuffer,
        request.stacksBlockHeight,
        getMetadata('readonly', request));

    let result = response;

    Logger.debug(`verify-block-header: ${result}`);

    return result;
}

export async function verifyBlockHeader2(request: VerifyBlockHeader2Request): Promise<boolean> {
    // Call readonly function
    //
    let response = await request.contract.verifyBlockHeader(
        request.blockCV['header'],
        request.blockCV['height'],
        getMetadata('readonly', request));

    let result = response;

    Logger.debug(`verify-block-header-2: ${result}`);

    return result;
}