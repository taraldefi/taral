import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import { BlockCvType, HeaderPartsType } from "./types";
import { makeBuffer } from "./utils";

export interface VerifyBlockHeaderRequest extends ClarityBitcoinRequest {
  headerParts: string[];
  stacksBlockHeight: number;
}

export interface VerifyBlockHeader2Request extends ClarityBitcoinRequest {
  blockCV: BlockCvType;
}

export interface ParseBlockHeaderRequest extends ClarityBitcoinRequest {
  header: Buffer;
}

export async function parseBlockHeader(
  request: ParseBlockHeaderRequest
): Promise<HeaderPartsType> {
  Logger.debug("Calling parseBlockHeader");

  const response = (
    await request.contract.parseBlockHeader(
      request.header,
      getMetadata("readonly", request)
    )
  )._unsafeUnwrap();

  Logger.debug("parseBlockHeader result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return response as any as HeaderPartsType;
}

export async function verifyBlockHeader(
  request: VerifyBlockHeaderRequest
): Promise<boolean> {
  Logger.debug("Calling verifyBlockHeader");

  const summedUpHeaderParts =
    request.headerParts[0] +
    request.headerParts[1] +
    request.headerParts[2] +
    request.headerParts[3] +
    request.headerParts[4] +
    request.headerParts[5];
  const headerPartsBuffer = makeBuffer(summedUpHeaderParts);

  // Call readonly function
  //
  let response = await request.contract.verifyBlockHeader(
    headerPartsBuffer,
    request.stacksBlockHeight,
    getMetadata("readonly", request)
  );

  let result = response;

  Logger.debug("verifyBlockHeader result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return result;
}

export async function verifyBlockHeader2(
  request: VerifyBlockHeader2Request
): Promise<boolean> {
  Logger.debug("Calling verifyBlockHeader2");

  // Call readonly function
  //
  let response = await request.contract.verifyBlockHeader(
    request.blockCV["header"],
    request.blockCV["height"],
    getMetadata("readonly", request)
  );

  let result = response;

  Logger.debug("verifyBlockHeader2 result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return result;
}
