import MerkleTree from "merkletreejs";
import { Logger } from "../logger";
import { ClarityBitcoinRequest } from "./base-request";
import { getReversedTxId } from "./get-txid";
import { HeaderPartsType, ProofCvType } from "./types";
import { makeBuffer, reverse } from "./utils";

export interface VerifyMerkleProofRequest extends ClarityBitcoinRequest {
  txId: string;
  merkleRoot: string;
  proofCV: ProofCvType;
}

export interface VerifyMerkleProof2Request extends ClarityBitcoinRequest {
  txCV: Buffer;
  headerPartsCV: HeaderPartsType;
  proofCV: ProofCvType;
}

export async function verifyMerkleProof(
  request: VerifyMerkleProofRequest
): Promise<string> {
  Logger.debug("Calling verifyMerkleProof");
  // Call readonly function
  //

  const bufferedTxId = reverse(MerkleTree.bufferify(request.txId));
  const bufferedMerkleRoot = reverse(MerkleTree.bufferify(request.merkleRoot));

  let response = (
    await request.contract.verifyMerkleProof(
      bufferedTxId,
      bufferedMerkleRoot,
      request.proofCV
    )
  )._unsafeUnwrap();

  let result = response.toString();

  Logger.debug(`verifyMerkleProof result: ${result}`);

  return result;
}

export async function verifyMerkleProof2(
  request: VerifyMerkleProof2Request
): Promise<string> {
  Logger.debug("Calling verifyMerkleProof2");
  // Call readonly function
  //

  let reversedTxId = await getReversedTxId({
    accounts: request.accounts,
    contract: request.contract,
    txCv: request.txCV,
  });

  if (reversedTxId.startsWith("0x")) {
    reversedTxId = reversedTxId.substring(2);
  }

  Logger.debug(`VerifyMerkleProof2: REVERSED TX ID ${reversedTxId}`);

  const reversedTxIdBuffer = makeBuffer(reversedTxId);
  const merkleRootBuffer = request.headerPartsCV["merkle-root"];

  let response = (
    await request.contract.verifyMerkleProof(
      reversedTxIdBuffer,
      merkleRootBuffer,
      request.proofCV
    )
  )._unsafeUnwrap();

  let result = response.toString();

  Logger.debug(`verifyMerkleProof2 result ${result}`);
  return result;
}
