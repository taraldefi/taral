import { Logger } from "lib-shared";
import { ClarityBitcoinContract } from "taral-generated-contracts";
import { BlockCvType, HeaderPartsType } from "./types";
import { makeBuffer } from "./utils";

export async function parseBlockHeader({
  header,
  contract,
}: {
  header: string;
  contract: ClarityBitcoinContract;
}): Promise<HeaderPartsType> {
  const response = (
    await contract.parseBlockHeader(makeBuffer(header))
  )._unsafeUnwrap();

  let result = response as any as HeaderPartsType;

  Logger.debug("parse-block-header", "Received result ", result);

  return result;
}

export async function verifyBlockHeader({
  headerParts,
  stacksBlockHeight,
  contract,
}: {
  headerParts: string[];
  stacksBlockHeight: bigint;
  contract: ClarityBitcoinContract;
}): Promise<boolean> {
  const summedUpHeaderParts =
    headerParts[0] +
    headerParts[1] +
    headerParts[2] +
    headerParts[3] +
    headerParts[4] +
    headerParts[5];

  const headerPartsBuffer = makeBuffer(summedUpHeaderParts);

  // Call readonly function
  //
  let response = await contract.verifyBlockHeader(
    headerPartsBuffer,
    stacksBlockHeight
  );

  let result = response;

  Logger.debug("verify-block-header", "Received result ", result);
  return result;
}

export async function verifyBlockHeader2({
  blockCV,
  contract,
}: {
  blockCV: BlockCvType;
  contract: ClarityBitcoinContract;
}): Promise<boolean> {
  // Call readonly function
  //
  let response = await contract.verifyBlockHeader(
    blockCV["header"],
    blockCV["height"]
  );

  let result = response;

  Logger.debug("verify-block-header", "Received result ", result);
  return result;
}
