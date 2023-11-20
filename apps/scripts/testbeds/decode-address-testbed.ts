import { decodeStxAddress } from "lib-bitcoin";
import { Logger } from "lib-shared";

const LOGGER_CATEGORY = "DECODE_ADDRESS";

export function decodeAddress() {
  const result = decodeStxAddress("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM");

  Logger.debug(
    LOGGER_CATEGORY,
    "Decoded stx address: ",
    `0x${result.data.toString("hex")}`, // 0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce
  );
}
