import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

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
    })
});