import { address } from "bitcoinjs-lib";
import { Logger, txOk } from "..";
import { FtSwapRequest, getAddress, getMetadata } from "./base-request";

export interface BtcFtSwapRequest extends FtSwapRequest {
  btcAddress: string;
  stxAddress: string;
  btcAmount: number;
  ftAmount: number;
  ftContract: string;
}

function btcToSats(btcAmount: number): number {
  return btcAmount * 100_000_000;
}

export async function createBtcFtSwap(
  request: BtcFtSwapRequest
): Promise<number> {
  Logger.debug("Calling createBtcFtSwap");

  const sats = btcToSats(request.btcAmount);

  const btcReceiver = address.toOutputScript(request.btcAddress);

  let response = await txOk(
    request.contract.createSwap(
      sats,
      btcReceiver,
      request.ftAmount,
      request.stxAddress,
      request.ftContract,
      getMetadata("public", request)
    ),
    getAddress(request)
  );

  Logger.debug("createBtcFtSwap result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return response.value;
}
