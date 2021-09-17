import { ClarityBitcoinContract } from "taral-generated-contracts";
import { Logger } from "../logger";
import { BlockCvType, HeaderPartsType } from "./types";
import { makeBuffer } from "./utils";

export async function parseBlockHeader({
  header,
  contract,
}: {
  header: string;
  contract: ClarityBitcoinContract;
}): Promise<HeaderPartsType> {
  Logger.debug("Calling parseBlockHeader");

  const response = (
    await contract.parseBlockHeader(makeBuffer(header))
  )._unsafeUnwrap();

  let result = response as any as HeaderPartsType;

  Logger.debug(`parseBlockHeader result ${response}`);
  Logger.debug(JSON.stringify(result));

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
  Logger.debug("Calling verifyBlockHeader");

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

  Logger.debug("verifyBlockHeader result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return result;
}

export async function verifyBlockHeader2({
  blockCV,
  contract,
}: {
  blockCV: BlockCvType;
  contract: ClarityBitcoinContract;
}): Promise<boolean> {
  Logger.debug("Calling verifyBlockHeader2");

  // Call readonly function
  //
  let response = await contract.verifyBlockHeader(
    blockCV["header"],
    blockCV["height"]
  );

  let result = response;

  Logger.debug(`verifyBlockHeader response ${response}`);

  return result;
}
