import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";
import { hexStringToUint8Array } from "./helpers/helpers";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;

describe("test clarity bitcoin", () => {
    it("Ensures that valid merkle proofs are validated", () => {
      
      // get some reverse value of buffers
        
      let reverseBufferResult = simnet.callReadOnlyFn(
        "clarity-bitcoin",
        "reverse-buff32",
        [Cl.bufferFromHex("3bd3a1309a518c381248fdc26c3a6bd62c35db7705069f59206684308cc237b3")],
        WALLET_1
      );

      expect(reverseBufferResult.result).toBeBuff(hexStringToUint8Array("0xb337c28c30846620599f060577db352cd66b3a6cc2fd4812388c519a30a1d33b"));

      reverseBufferResult = simnet.callReadOnlyFn(
        "clarity-bitcoin",
        "reverse-buff32",
        [Cl.bufferFromHex("7ad9187efd4fa01ce8690015a1a711d7958f18c248fb4c47a32d00732cfc4a61")],
        WALLET_1
      );

      expect(reverseBufferResult.result).toBeBuff(hexStringToUint8Array("0x614afc2c73002da3474cfb48c2188f95d711a7a1150069e81ca04ffd7e18d97a"));
      
      reverseBufferResult = simnet.callReadOnlyFn(
        "clarity-bitcoin",
        "reverse-buff32",
        [Cl.bufferFromHex("5af66bfeb6d1307baae361666038ac6fffdfef311ec0b67894b770ef983685ed")],
        WALLET_1
      );

      expect(reverseBufferResult.result).toBeBuff(hexStringToUint8Array("0xed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65a"));
    });
});
  
