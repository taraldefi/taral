import { Logger, txOk } from "lib-shared";
import { BtcFtSwapContract } from "taral-node-contracts";
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
  const result = await txOk(
    contract.submitSwap(swapId, headerPartsCv, txPartsCv, proofCv, ftContract)
  );

  Logger.debug("submit-swap", "Received result ", result);
  return result.value;
}
