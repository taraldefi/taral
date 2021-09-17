import { BtcFtSwapContract } from "taral-generated-contracts";
import { Logger, txOk } from "..";
import { HeaderPartsType, ProofCvType, TxPartsCvType } from "./types";

export async function submitSwap({
  swapId,
  headerPartsCv,
  txPartsCv,
  proofCv,
  ftContract,
  contract,
}: {
  swapId: bigint;
  headerPartsCv: HeaderPartsType;
  txPartsCv: TxPartsCvType;
  proofCv: ProofCvType;
  ftContract: string;
  contract: BtcFtSwapContract;
}): Promise<boolean> {
  Logger.debug("Calling submitSwap");

  const result = await txOk(
    contract.submitSwap(swapId, headerPartsCv, txPartsCv, proofCv, ftContract)
  );

  Logger.debug("submitSwap result");
  Logger.debug(JSON.stringify(result));
  Logger.debug("---------------");

  return result.value;
}
