// deno-lint-ignore-file no-explicit-any
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Clarinet } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Tx } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Chain } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Account } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { types } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { assertEquals } from "../src/dependencies.ts";

function poxAllowContractCaller(deployer: Account, wallet: Account) {
  return Tx.contractCall(
    "ST000000000000000000002AMW42H.pox",
    "allow-contract-caller",
    [types.principal(deployer.address + ".insurance-pool-admin"), types.none()],
    wallet.address,
  );
}

function poolAllowContractCaller(deployer: Account, wallet: Account) {
  return Tx.contractCall(
    "insurance-pool-admin",
    "allow-contract-caller",
    [types.principal(deployer.address + ".insurance-pool-admin")],
    wallet.address,
  );
}

Clarinet.test({
  name: "Ensure that user can pay in",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const walletOne = accounts.get("wallet_1")!;
    const block = chain.mineBlock([
      Tx.contractCall(
        "insurance-pool-admin",
        "payin",
        [types.uint(1000000), types.uint(1)],
        walletOne.address,
      ),
    ]);

    assertEquals(block.height, 4);
    console.log("Block");
    console.log(JSON.stringify(block));
    block.receipts[0].result.expectOk();
  },
});

// Clarinet.test({
//   name: "Ensure that user can receive rewards",
//   fn(chain: Chain, accounts: Map<string, Account>) {
//     const walletOne = accounts.get("wallet_1")!;
//     const deployer = accounts.get("deployer")!;

//     let block = chain.mineBlock([
//       poxAllowContractCaller(deployer, walletOne),
//       poolAllowContractCaller(deployer, walletOne),

//       Tx.contractCall(
//         "insurance-pool-admin",
//         "delegate-stx",
//         [
//           types.uint(1000000),
//           types.principal(deployer.address + ".insurance-pool-admin"),
//           types.some(types.uint(450)),
//           types.none(),
//           types.tuple({
//             version: "0x01",
//             hashbytes: "0x12345678901234567890",
//           }),
//           types.uint(2),
//         ],
//         walletOne.address
//       ),
//     ]);
//     assertEquals(block.height, 2);
//     block.receipts[0].result.expectOk();
//     block.receipts[1].result.expectOk();
//     (block.receipts[2].result.expectOk().expectTuple() as any)[
//       "unlock-burn-height"
//     ].expectUint(450);

//     assertEquals(
//       chain.callReadOnlyFn(
//         "insurance-pool-admin",
//         "get-next-cycle",
//         [],
//         walletOne.address
//       ).result,
//       types.uint(1)
//     );
//     // mine through reward cycle
//     chain.mineEmptyBlock(150);
//     // check cycle id
//     assertEquals(
//       chain.callReadOnlyFn(
//         "insurance-pool-admin",
//         "get-next-cycle",
//         [],
//         walletOne.address
//       ).result,
//       types.uint(2)
//     );
//     // payin and claim reward
//     block = chain.mineBlock([
//       Tx.contractCall(
//         "insurance-pool-admin",
//         "payin",
//         [types.uint(100), types.uint(0)],
//         deployer.address
//       ),
//       Tx.contractCall(
//         "insurance-pool-admin",
//         "claim-rewards",
//         [types.uint(0)],
//         walletOne.address
//       ),
//     ]);

//     assertEquals(block.height, 153);
//     block.receipts[0].result.expectOk();
//     assertEquals(block.receipts[1].result, "(err u0)"); // no rewards
//   },
// });
