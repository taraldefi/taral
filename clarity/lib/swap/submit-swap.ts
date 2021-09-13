import { ClarinetAccount, IMetadata, Logger, txOk } from "..";
import { FtSwapRequest, getAddress, getMetadata } from "./base-request";
import { HeaderPartsType, ProofCvType, TxPartsCvType } from "./types";

export interface SubmitSwapRequest extends FtSwapRequest {
  swapId: number;
  headerPartsCv: HeaderPartsType;
  txPartsCv: TxPartsCvType;
  proofCv: ProofCvType;
  ftContract: string;
  caller: ClarinetAccount;
}

export async function submitSwap(request: SubmitSwapRequest): Promise<boolean> {
  Logger.debug("Calling submitSwap");

  const metadata: IMetadata = {
    discriminator: 'metadata',
    address: request.caller.address,
    sender: request.caller.privateKey
  };

  const result = await txOk(
    request.contract.submitSwap(
      request.swapId,
      request.headerPartsCv,
      request.txPartsCv,
      request.proofCv,
      request.ftContract,
      metadata
    ),
    request.caller.privateKey
  );

  Logger.debug("submitSwap result");
  Logger.debug(JSON.stringify(result));
  Logger.debug("---------------");

  return result.value;
}
