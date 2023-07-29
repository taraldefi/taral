import { Logger } from "lib-shared";
import MerkleTree from "merkletreejs";
import { ClarityBitcoinContract } from "taral-contracts";
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
  // Call readonly function
  //

  const bufferedTxId = reverse(MerkleTree.bufferify(txId));
  const bufferedMerkleRoot = reverse(MerkleTree.bufferify(merkleRoot));

  const response = (
    await contract.verifyMerkleProof(bufferedTxId, bufferedMerkleRoot, proofCV)
  )._unsafeUnwrap();

  const result = response.toString();

  Logger.debug("verify-merkle-proof", "Received result ", response);

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
  // Call readonly function
  //

  let reversedTxId = await getReversedTxId({
    contract: contract,
    txCv: txCV,
  });

  if (reversedTxId.startsWith("0x")) {
    reversedTxId = reversedTxId.substring(2);
  }

  const reversedTxIdBuffer = makeBuffer(reversedTxId);
  const merkleRootBuffer = headerPartsCV["merkle-root"];

  const response = (
    await contract.verifyMerkleProof(
      reversedTxIdBuffer,
      merkleRootBuffer,
      proofCV
    )
  )._unsafeUnwrap();

  const result = response.toString();

  Logger.debug("verify-merkle-proof-2", "Received result ", response);
  return result;
}
