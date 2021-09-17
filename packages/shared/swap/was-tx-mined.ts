import { ClarityBitcoinContract } from "taral-generated-contracts";
import { Logger } from "../logger";
import { BlockCvType, BlockPartsType, ProofCvType } from "./types";

export async function wasTxMined({
  blockPartsCV, txCV, proofCV, contract
}: {
  blockPartsCV: BlockPartsType;
  txCV: Buffer;
  proofCV: ProofCvType;
  contract: ClarityBitcoinContract;
}): Promise<boolean> {
  Logger.debug("Calling wasTxMined");

  // Call readonly function
  //
  let response = await contract.wasTxMined(
    blockPartsCV,
    txCV,
    proofCV
  );

  let result = response._unsafeUnwrap();

  Logger.debug(`wasTxMined result ${result}`);

  return result;
}

export async function wasTxMinedFromHex({
  blockCV, txCV, proofCV, contract
  }: {
    blockCV: BlockCvType;
    txCV: Buffer;
    proofCV: ProofCvType;
    contract: ClarityBitcoinContract;
  }
): Promise<boolean> {
  Logger.debug("Calling wasTxMinedFromHex");

  // Call readonly function
  //
  let response = await contract.wasTxMinedCompact(
    blockCV,
    txCV,
    proofCV
  );

  let result = response._unsafeUnwrap();

  Logger.debug("wasTxMinedFromHex result");
  Logger.debug(JSON.stringify(result));
  Logger.debug("---------------");

  return result;
}
