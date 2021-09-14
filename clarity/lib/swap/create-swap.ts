import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";
import { Logger, txOk } from "..";
import { FtSwapRequest } from "./base-request";
import { makeBuffer } from "./utils";

export interface BtcFtSwapRequest extends FtSwapRequest {
  ftSellerBitcoinAddress: string;
  btcAmount: number;
  ftAmount: number;
  ftBuyerStacksAddress: string;
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

  const ftSellerBitcoinAddress = address
    .toOutputScript(
      request.ftSellerBitcoinAddress,
      request.network ?? btc.networks.regtest
    )
    .toString("hex");

  let response = await txOk(
    request.contract.createSwap(
      sats,
      makeBuffer(ftSellerBitcoinAddress),
      request.ftAmount,
      request.ftBuyerStacksAddress,
      request.ftContract
    )
  );

  Logger.debug("createBtcFtSwap result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return response.value;
}
