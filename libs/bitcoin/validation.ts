import * as btc from "bitcoinjs-lib";

export function isValidBtcAddress(
  network: btc.Network,
  address: string
): boolean {
  try {
    btc.address.toOutputScript(address, network);
    return true;
  } catch (error) {
    return false;
  }
}
