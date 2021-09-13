import { address } from "bitcoinjs-lib";
import { Logger, txOk } from "..";
import { FtSwapRequest, getAddress, getMetadata, getPrivateKey } from "./base-request";
import * as btc from "bitcoinjs-lib";
import { makeBuffer } from "./utils";

export interface BtcFtSwapRequest extends FtSwapRequest {
  btcAddress: string;
  stxAddress: string;
  btcAmount: number;
  ftAmount: number;
  ftContract: string;

  network?: btc.networks.Network;
}

function btcToSats(btcAmount: number): number {
  return btcAmount * 100_000_000;
}

export async function createBtcFtSwap(
  request: BtcFtSwapRequest
): Promise<number> {
  Logger.debug("Calling createBtcFtSwap");

  const sats = btcToSats(request.btcAmount);

  const btcReceiver = address.toOutputScript(request.btcAddress, request.network ?? btc.networks.regtest).toString('hex');

  
  let response = await txOk(
    request.contract.createSwap(
      sats,
      makeBuffer(btcReceiver),
      request.ftAmount,
      request.stxAddress,
      request.ftContract,
      getMetadata(request)
    ),
    getPrivateKey(request)
  );

  Logger.debug("createBtcFtSwap result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return response.value;
}
