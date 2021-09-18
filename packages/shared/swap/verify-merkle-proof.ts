import MerkleTree from "merkletreejs";
import { ClarityBitcoinContract } from "taral-generated-contracts";
import { Logger } from "../logger";
import { getReversedTxId } from "./get-txid";
import { HeaderPartsType, ProofCvType } from "./types";
import { makeBuffer, reverse } from "./utils";

export async function verifyMerkleProof({
  txId,
  merkleRoot,
  proofCV,
  contract,
}: {
  txId: string;
  merkleRoot: string;
  proofCV: ProofCvType;
  contract: ClarityBitcoinContract;
}): Promise<string> {
  Logger.debug("Calling verifyMerkleProof");
  // Call readonly function
  //

  const bufferedTxId = reverse(MerkleTree.bufferify(txId));
  const bufferedMerkleRoot = reverse(MerkleTree.bufferify(merkleRoot));

  let response = (
    await contract.verifyMerkleProof(bufferedTxId, bufferedMerkleRoot, proofCV)
  )._unsafeUnwrap();

  let result = response.toString();

  Logger.debug(`verifyMerkleProof result: ${result}`);

  return result;
}

export async function verifyMerkleProof2({
  txCV,
  headerPartsCV,
  proofCV,
  contract,
}: {
  txCV: Buffer;
  headerPartsCV: HeaderPartsType;
  proofCV: ProofCvType;
  contract: ClarityBitcoinContract;
}): Promise<string> {
  Logger.debug("Calling verifyMerkleProof2");
  // Call readonly function
  //

  let reversedTxId = await getReversedTxId({
    contract: contract,
    txCv: txCV,
  });

  if (reversedTxId.startsWith("0x")) {
    reversedTxId = reversedTxId.substring(2);
  }

  Logger.debug(`VerifyMerkleProof2: REVERSED TX ID ${reversedTxId}`);

  const reversedTxIdBuffer = makeBuffer(reversedTxId);
  const merkleRootBuffer = headerPartsCV["merkle-root"];

  let response = (
    await contract.verifyMerkleProof(
      reversedTxIdBuffer,
      merkleRootBuffer,
      proofCV
    )
  )._unsafeUnwrap();

  let result = response.toString();

  Logger.debug(`verifyMerkleProof2 result ${result}`);
  return result;
}
