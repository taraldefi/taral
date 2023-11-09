import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";
import { hexStringToUint8Array } from "./helpers/helpers";
import { parts } from "./fixtures";
import { tx } from "@hirosystems/clarinet-sdk";

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

      // values taken from
    // https://bitcoindev.network/calculating-the-merkle-root-for-a-block/
    const block = simnet.mineBlock([
        tx.callPublicFn(
          "clarity-bitcoin",
          "verify-merkle-proof",
          [
            // reversed tx of
            // 3bd3a1309a518c381248fdc26c3a6bd62c35db7705069f59206684308cc237b3
            Cl.bufferFromHex("b337c28c30846620599f060577db352cd66b3a6cc2fd4812388c519a30a1d33b"),
            // reversed merkle root of
            // 0x25c8487847de572c21bff029a95d9a9fecd9f4c2736984b979d37258cd47bd1f
            Cl.bufferFromHex("1fbd47cd5872d379b9846973c2f4d9ec9f9a5da929f0bf212c57de477848c825"),
            // proof
            Cl.tuple({
              "tx-index": Cl.uint(0),
              hashes: Cl.list([
                // reversed tx of 0xa99011a19e9894753d6c65c8fa412838ea8042886537588e7205734d5de8956d
                Cl.bufferFromHex("6d95e85d4d7305728e583765884280ea382841fac8656c3d7594989ea11190a9"),
              ]),
              "tree-depth": Cl.uint(1),
            }),
          ],
          WALLET_1
        ),
  
        // verify pool tx
        tx.callPublicFn(
          "clarity-bitcoin",
          "verify-merkle-proof",
          [
            // reversed tx of
            // 7ad9187efd4fa01ce8690015a1a711d7958f18c248fb4c47a32d00732cfc4a61
            Cl.bufferFromHex("614afc2c73002da3474cfb48c2188f95d711a7a1150069e81ca04ffd7e18d97a"),
            // reversed Merkle root of
            // 0x5af66bfeb6d1307baae361666038ac6fffdfef311ec0b67894b770ef983685ed
            Cl.bufferFromHex("ed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65a"),
            // proof
            Cl.tuple({
              "tx-index": Cl.uint(6),
              hashes: Cl.list([
                Cl.bufferFromHex("3ae3dfeedc6eb99fb5e2c5d0c90697a66de969c3f4d974ebe2ef104fcea7f13b"),
                Cl.bufferFromHex("52500d11cabf1049ebb139a82b439d08bd3a8e867a41fb3f368dfa125e043989"),
                Cl.bufferFromHex("a104c2725aabf28fcf3c304fd370610370330c546495acd5015ecc177c6494f6"),
                Cl.bufferFromHex("5e4442a235be2fc92aa15ba3b59c5af61c46dff8e7ed8198ebc48ec6d71a6a49"),
                Cl.bufferFromHex("904640bdf50c8edd12232efc41966a3a9af955208b205a90fc8a6dca5f69c458"),
              ]),
              "tree-depth": Cl.uint(5),
            }),
          ],
          WALLET_1
        ),
        // concat-header
        tx.callPublicFn(
          "clarity-bitcoin",
          "concat-header",
          [
            Cl.tuple({
              version: Cl.bufferFromHex("00200020"),
              parent:
                Cl.bufferFromHex("b9d30838796e6ea7ff4b441ca1d705c229f3492cfdddcd186b21000000000000"),
              "merkle-root":
                Cl.bufferFromHex("ed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65a"),
              timestamp: Cl.bufferFromHex("bec89660"),
              nbits:  Cl.bufferFromHex("0afd2219"),
              nonce:  Cl.bufferFromHex("6e2d6012"),
              height: Cl.uint(11319),
            }),
          ],
          WALLET_1
        ),
  
        // parse-tx
        tx.callPublicFn(
          "clarity-bitcoin",
          "parse-tx",
          [
            Cl.bufferFromHex("0100000001c8bd3502a21f810da7692e323cc46e0e9ec1def7a93cc610f6d65b60193174e2030000006a47304402204ffe267e6b5aab28350be80c1f4ea94424c483f3f44f175594bb6273000f80e8022042ebd5668420c8b29d2ec2791e2c8aa0d7784d8a6283f958fe581e0be129c61b0121037435c194e9b01b3d7f7a2802d6684a3af68d05bbf4ec8f17021980d777691f1dfdffffff040000000000000000536a4c5058365b13588072c8b4eca88a505db5c453123c5c91db98d90ac1cd124402dba596531ebf945361dbdbcb0a43e8d6984ab8eee14982d0341eab198fc74d2d917c6d95dc001e21c20008001e1fc2001d0210270000000000001976a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac10270000000000001976a9146c575e9f31715b180b22738136895876ade678cb88ac752f7c5c000000001976a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac00000000"),
          ],
          WALLET_1
        ),
  
        // verify block header
        tx.callPublicFn(
          "clarity-bitcoin",
          "verify-block-header",
          [
            Cl.bufferFromHex("00200020b9d30838796e6ea7ff4b441ca1d705c229f3492cfdddcd186b21000000000000ed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65abec896600afd22196e2d6012"),
            Cl.uint(11319),
          ],
          WALLET_1
        ),
  
        // was-tx-mined
  
        tx.callPublicFn(
          "clarity-bitcoin",
          "was-tx-mined",
          [
            Cl.tuple({
              version: Cl.bufferFromHex(parts[0]),
              parent: Cl.bufferFromHex(parts[1]),
              "merkle-root": Cl.bufferFromHex(parts[2]),
              timestamp: Cl.bufferFromHex(parts[3]),
              nbits: Cl.bufferFromHex(parts[4]),
              nonce: Cl.bufferFromHex(parts[5]),
              height: Cl.uint(11319),
            }),
            Cl.bufferFromHex("0100000001c8bd3502a21f810da7692e323cc46e0e9ec1def7a93cc610f6d65b60193174e2030000006a47304402204ffe267e6b5aab28350be80c1f4ea94424c483f3f44f175594bb6273000f80e8022042ebd5668420c8b29d2ec2791e2c8aa0d7784d8a6283f958fe581e0be129c61b0121037435c194e9b01b3d7f7a2802d6684a3af68d05bbf4ec8f17021980d777691f1dfdffffff040000000000000000536a4c5058365b13588072c8b4eca88a505db5c453123c5c91db98d90ac1cd124402dba596531ebf945361dbdbcb0a43e8d6984ab8eee14982d0341eab198fc74d2d917c6d95dc001e21c20008001e1fc2001d0210270000000000001976a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac10270000000000001976a9146c575e9f31715b180b22738136895876ade678cb88ac752f7c5c000000001976a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac00000000"),
            Cl.tuple({
              "tx-index": Cl.uint(6),
              hashes: Cl.list([
                Cl.bufferFromHex("3ae3dfeedc6eb99fb5e2c5d0c90697a66de969c3f4d974ebe2ef104fcea7f13b"),
                Cl.bufferFromHex("52500d11cabf1049ebb139a82b439d08bd3a8e867a41fb3f368dfa125e043989"),
                Cl.bufferFromHex("a104c2725aabf28fcf3c304fd370610370330c546495acd5015ecc177c6494f6"),
                Cl.bufferFromHex("5e4442a235be2fc92aa15ba3b59c5af61c46dff8e7ed8198ebc48ec6d71a6a49"),
                Cl.bufferFromHex("904640bdf50c8edd12232efc41966a3a9af955208b205a90fc8a6dca5f69c458"),
              ]),
              "tree-depth": Cl.uint(5),
            }),
          ],
          WALLET_1
        ),
  
        tx.callPublicFn(
          "clarity-bitcoin",
          "concat-tx",
          [
            Cl.tuple({
              version: Cl.bufferFromHex("01000000"),
              ins: Cl.list([
                Cl.tuple({
                  outpoint: Cl.tuple({
                    hash: Cl.bufferFromHex("c8bd3502a21f810da7692e323cc46e0e9ec1def7a93cc610f6d65b60193174e2"),
                    index: Cl.bufferFromHex("03000000"),
                  }),
                  scriptSig:
                    Cl.bufferFromHex("47304402204ffe267e6b5aab28350be80c1f4ea94424c483f3f44f175594bb6273000f80e8022042ebd5668420c8b29d2ec2791e2c8aa0d7784d8a6283f958fe581e0be129c61b0121037435c194e9b01b3d7f7a2802d6684a3af68d05bbf4ec8f17021980d777691f1d"),
                  sequence: Cl.bufferFromHex("fdffffff"),
                }),
              ]),
              outs: Cl.list([
                Cl.tuple({
                  scriptPubKey:
                    Cl.bufferFromHex("6a4c5058365b13588072c8b4eca88a505db5c453123c5c91db98d90ac1cd124402dba596531ebf945361dbdbcb0a43e8d6984ab8eee14982d0341eab198fc74d2d917c6d95dc001e21c20008001e1fc2001d02"),
                  value: Cl.bufferFromHex("0000000000000000"),
                }),
                Cl.tuple({
                  scriptPubKey:
                    Cl.bufferFromHex("76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac"),
                  value: Cl.bufferFromHex("1027000000000000"),
                }),
                Cl.tuple({
                  scriptPubKey:
                    Cl.bufferFromHex("76a9146c575e9f31715b180b22738136895876ade678cb88ac"),
                  value: Cl.bufferFromHex("1027000000000000"),
                }),
                Cl.tuple({
                  scriptPubKey:
                    Cl.bufferFromHex("76a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac"),
                  value: Cl.bufferFromHex("752f7c5c00000000"),
                }),
              ]),
              locktime: Cl.bufferFromHex("00000000"),
            }),
          ],
          WALLET_1
        ),
      ]);
    });
});
  
