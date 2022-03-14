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

Clarinet.test({
  name: "oracle: only current oracle owner can update owner and prices",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const walletOne = accounts.get("wallet_1")!;

    // Update price
    let block = chain.mineBlock([
      Tx.contractCall(
        "taral-oracle-v1",
        "update-price",
        [types.ascii("STX"), types.uint(1000000), types.uint(1000000)],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectUint(1000000);

    // Update owner
    block = chain.mineBlock([
      Tx.contractCall(
        "taral-oracle-v1",
        "set-oracle-owner",
        [types.principal(walletOne.address)],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    // Update price
    block = chain.mineBlock([
      Tx.contractCall(
        "taral-oracle-v1",
        "update-price",
        [types.ascii("STX"), types.uint(1000000), types.uint(1000000)],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectErr().expectUint(851);

    // Update owner fails if not done by owner
    block = chain.mineBlock([
      Tx.contractCall(
        "taral-oracle-v1",
        "set-oracle-owner",
        [types.principal(deployer.address)],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectErr().expectUint(8401);
  },
});
