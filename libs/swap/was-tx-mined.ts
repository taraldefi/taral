import { Logger } from "lib-shared";
import { ClarityBitcoinContract } from "taral-contracts";
import { BlockCvType, BlockPartsType, ProofCvType } from "./types";

export async function wasTxMined({
  blockPartsCV,
  txCV,
  proofCV,
  contract,
}: {
  blockPartsCV: BlockPartsType;
  txCV: Buffer;
  proofCV: ProofCvType;
  contract: ClarityBitcoinContract;
}): Promise<boolean> {
  // Call readonly function
  //
  const response = await contract.wasTxMined(blockPartsCV, txCV, proofCV);

  const result = response._unsafeUnwrap();

  Logger.debug("was-tx-mined", "Received result ", result);

  return result;
}

export async function wasTxMinedFromHex({
  blockCV,
  txCV,
  proofCV,
  contract,
}: {
  blockCV: BlockCvType;
  txCV: Buffer;
  proofCV: ProofCvType;
  contract: ClarityBitcoinContract;
}): Promise<boolean> {
  // Call readonly function
  //
  const response = await contract.wasTxMinedCompact(blockCV, txCV, proofCV);

  const result = response._unsafeUnwrap();

  Logger.debug("was-tx-mined-from-hex", "Received result ", result);

  return result;
}
