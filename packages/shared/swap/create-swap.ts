import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";
import { BtcFtSwapContract } from "taral-generated-contracts";
import { Logger, txOk } from "..";
import { makeBuffer } from "./utils";

function btcToSats(btcAmount: number): number {
  return btcAmount * 100_000_000;
}

export async function createBtcFtSwap(
  { ftSellerBitcoinAddress, btcAmount, ftAmount, ftBuyerStacksAddress, ftContract, network, contract}: {
    ftSellerBitcoinAddress: string;
    btcAmount: number;
    ftAmount: number;
    ftBuyerStacksAddress: string;
    ftContract: string;
    network?: btc.networks.Network;
    contract: BtcFtSwapContract
  }
): Promise<bigint> {
  Logger.debug("Calling createBtcFtSwap");

  const sats = btcToSats(btcAmount);

  const ftSellerAddressScript = address
    .toOutputScript(
      ftSellerBitcoinAddress,
      network ?? btc.networks.regtest
    ).toString("hex");

  let response = await txOk(
    contract.createSwap(
      sats,
      makeBuffer(ftSellerAddressScript),
      ftAmount,
      ftBuyerStacksAddress,
      ftContract
    )
  );

  Logger.debug("createBtcFtSwap result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return response.value;
}
