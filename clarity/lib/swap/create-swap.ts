import { address } from "bitcoinjs-lib";
import { ClarinetAccount, IMetadata, Logger, txOk } from "..";
import { FtSwapRequest, getMetadata, getPrivateKey } from "./base-request";
import * as btc from "bitcoinjs-lib";
import { makeBuffer } from "./utils";

export interface BtcFtSwapRequest extends FtSwapRequest {
  ftSellerBitcoinAddress: string;
  btcAmount: number;
  ftAmount: number;
  ftBuyerStacksAddress: string;
  ftContract: string;
  network?: btc.networks.Network;
  caller: ClarinetAccount;
}

function btcToSats(btcAmount: number): number {
  return btcAmount * 100_000_000;
}

export async function createBtcFtSwap(
  request: BtcFtSwapRequest
): Promise<number> {
  Logger.debug("Calling createBtcFtSwap");

  const sats = btcToSats(request.btcAmount);

  const ftSellerBitcoinAddress = address.toOutputScript(request.ftSellerBitcoinAddress, request.network ?? btc.networks.regtest).toString('hex');


  const metadata: IMetadata = {
    discriminator: 'metadata',
    address: request.caller.address,
    sender: request.caller.privateKey
  };

  let response = await txOk(
    request.contract.createSwap(
      sats,
      makeBuffer(ftSellerBitcoinAddress),
      request.ftAmount,
      request.ftBuyerStacksAddress,
      request.ftContract,
      metadata
    ),
    request.caller.privateKey
  );

  Logger.debug("createBtcFtSwap result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return response.value;
}
