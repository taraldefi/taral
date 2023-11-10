import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";
import { parts } from "./fixtures";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const DEPLOYER = accounts.get("deployer")!;

const VERBOSE = false;

describe("test insurance audit flows", () => {
    it("Blank", () => {
        expect(true).toBeTruthy();
    }),

    it("Ensure that invalid txs are not accepted", () => {
        const submitRewardTx = simnet.callPublicFn(
            "insurance-pool-audit",
            "submit-reward-tx",
            [
                // block
                Cl.tuple({
                    "merkle-root": Cl.bufferFromHex("1234"),
                    nbits: Cl.bufferFromHex("1234"),
                    nonce: Cl.bufferFromHex("1234"),
                    parent: Cl.bufferFromHex("123456"),
                    timestamp: Cl.bufferFromHex("1234"),
                    version: Cl.bufferFromHex("1234"),
                    height: Cl.uint(0),
                }),
                // tx
                Cl.tuple({
                    ins: Cl.list([]),
                    outs: Cl.list([]),
                    locktime: Cl.bufferFromHex("1234"),
                    version: Cl.bufferFromHex("1234"),
                }),

                // proof
                Cl.tuple({
                    "tx-index": Cl.uint(1),
                    hashes: Cl.list([]),
                    "tree-depth": Cl.uint(1),
                }),
            ],
            WALLET_1
        );

        if (VERBOSE) {
            console.log("Submit Reward Tx:", JSON.stringify(submitRewardTx, null, 2));
        }

        const getTxValueForPoolCompactResult = simnet.callReadOnlyFn(
            "insurance-pool-audit-compact",
            "get-tx-value-for-pool-compact",
            [
                Cl.bufferFromHex("0100000001c8bd3502a21f810da7692e323cc46e0e9ec1def7a93cc610f6d65b60193174e2030000006a47304402204ffe267e6b5aab28350be80c1f4ea94424c483f3f44f175594bb6273000f80e8022042ebd5668420c8b29d2ec2791e2c8aa0d7784d8a6283f958fe581e0be129c61b0121037435c194e9b01b3d7f7a2802d6684a3af68d05bbf4ec8f17021980d777691f1dfdffffff040000000000000000536a4c5058365b13588072c8b4eca88a505db5c453123c5c91db98d90ac1cd124402dba596531ebf945361dbdbcb0a43e8d6984ab8eee14982d0341eab198fc74d2d917c6d95dc001e21c20008001e1fc2001d0210270000000000001976a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ac10270000000000001976a9146c575e9f31715b180b22738136895876ade678cb88ac752f7c5c000000001976a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac00000000"),
            ],
            WALLET_1
        );

        if (VERBOSE) {
            console.log("Get Tx Value For Pool Compact Result:", JSON.stringify(getTxValueForPoolCompactResult, null, 2));
        }

        expect(submitRewardTx.result).toBeErr(Cl.uint(1000));
    }),

    it("Ensure that valid txs report the correct amount", () => {
        // const parts = [
        //     "0x00200020",
        //     "0xb9d30838796e6ea7ff4b441ca1d705c229f3492cfdddcd186b21000000000000",
        //     "0xed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65a",
        //     "0xbec89660",
        //     "0x0afd2219",
        //     "0x6e2d6012",
        //   ];

        const validTransactionModel = Cl.tuple({
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
                    scriptPubKey: Cl.bufferFromHex("76a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ac"),
                    value: Cl.bufferFromHex("1027000000000000"),
                }),
                Cl.tuple({
                    scriptPubKey: Cl.bufferFromHex("76a9146c575e9f31715b180b22738136895876ade678cb88ac"),
                    value: Cl.bufferFromHex("1027000000000000"),
                }),
                Cl.tuple({
                    scriptPubKey: Cl.bufferFromHex("76a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac"),
                    value: Cl.bufferFromHex("752f7c5c00000000"),
                }),
            ]),
            locktime: Cl.bufferFromHex("00000000"),
        });

        const value = simnet.callReadOnlyFn(
            "insurance-pool-audit",
            "get-tx-value-for-pool",
            [validTransactionModel],
            WALLET_1
        );

        if (VERBOSE) {
            console.log("Get Tx Value For Pool Result:", JSON.stringify(value, null, 2));
        }

        expect(value.result).toBeOk(Cl.uint(10000));
    }),

    it("Ensure that valid txs can be reported", () => {

        const validTransactionModel = Cl.tuple({
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
                    scriptPubKey: Cl.bufferFromHex("76a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ac"),
                    value: Cl.bufferFromHex("1027000000000000"),
                }),
                Cl.tuple({
                    scriptPubKey: Cl.bufferFromHex("76a9146c575e9f31715b180b22738136895876ade678cb88ac"),
                    value: Cl.bufferFromHex("1027000000000000"),
                }),
                Cl.tuple({
                    scriptPubKey: Cl.bufferFromHex("76a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac"),
                    value: Cl.bufferFromHex("752f7c5c00000000"),
                }),
            ]),
            locktime: Cl.bufferFromHex("00000000"),
        });

        const result = simnet.callPublicFn(
            "insurance-pool-audit",
            "submit-reward-tx",
            [
                // block
                Cl.tuple({
                    version: Cl.bufferFromHex(parts[0]),
                    parent: Cl.bufferFromHex(parts[1]),
                    "merkle-root": Cl.bufferFromHex(parts[2]),
                    timestamp: Cl.bufferFromHex(parts[3]),
                    nbits: Cl.bufferFromHex(parts[4]),
                    nonce: Cl.bufferFromHex(parts[5]),
                    height: Cl.uint(11319),
                }),
                // tx
                validTransactionModel,

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
        );

        expect(result.result).toBeErr(Cl.uint(1000));
    })
});