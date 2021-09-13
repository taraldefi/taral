import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";
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
  Logger.debug("Calling wasTxMined");

  // Call readonly function
  //
  let response = await request.contract.wasTxMined(
    request.blockPartsCV,
    request.txCV,
    request.proofCV,
    getMetadata(request)
  );

  let result = response._unsafeUnwrap();

  Logger.debug(`wasTxMined result ${result}`);

  return result;
}

export async function wasTxMinedFromHex(
  request: WasTxMinedFromHexRequest
): Promise<boolean> {
  Logger.debug("Calling wasTxMinedFromHex");

  // Call readonly function
  //
  let response = await request.contract.wasTxMinedCompact(
    request.blockCV,
    request.txCV,
    request.proofCV,
    getMetadata(request)
  );

  let result = response._unsafeUnwrap();

  Logger.debug("wasTxMinedFromHex result");
  Logger.debug(JSON.stringify(result));
  Logger.debug("---------------");

  return result;
}
