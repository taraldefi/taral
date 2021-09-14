import { Logger, txOk } from "..";
import { FtSwapRequest } from "./base-request";
import { HeaderPartsType, ProofCvType, TxPartsCvType } from "./types";

export interface SubmitSwapRequest extends FtSwapRequest {
  swapId: number;
  headerPartsCv: HeaderPartsType;
  txPartsCv: TxPartsCvType;
  proofCv: ProofCvType;
  ftContract: string;
}

export async function submitSwap(request: SubmitSwapRequest): Promise<boolean> {
  Logger.debug("Calling submitSwap");

  const result = await txOk(
    request.contract.submitSwap(
      request.swapId,
      request.headerPartsCv,
      request.txPartsCv,
      request.proofCv,
      request.ftContract,
    ),
  );

  Logger.debug("submitSwap result");
  Logger.debug(JSON.stringify(result));
  Logger.debug("---------------");

  return result.value;
}
