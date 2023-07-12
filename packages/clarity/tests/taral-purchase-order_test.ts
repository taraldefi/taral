// deno-lint-ignore-file no-explicit-any
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Clarinet } from '../src/dependencies.ts';
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Tx } from '../src/dependencies.ts';
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Chain } from '../src/dependencies.ts';
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Account } from '../src/dependencies.ts';
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { types } from '../src/dependencies.ts';
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { assertEquals } from '../src/dependencies.ts';

Clarinet.test({
  name: 'Should check if a user holds TAL tokens',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get('deployer')!;
    let exporter_wallet = accounts.get('wallet_8')!;
    let exporter2_wallet = accounts.get('wallet_9')!;

    //act
    chain.mineBlock([
      Tx.contractCall(
        'taral-coin',
        'mint',
        [types.principal(exporter_wallet.address), types.uint(10)],
        deployer.address
      ),
    ]);
    let block = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'check-if-user-holds-tal-token',
        [types.principal(exporter_wallet.address)],
        deployer.address
      ),
    ]);
    let block2 = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'check-if-user-holds-tal-token',
        [types.principal(exporter2_wallet.address)],
        deployer.address
      ),
    ]);

    let [receipt] = block.receipts;
    let [receipt2] = block2.receipts;
    assertEquals(receipt.result, '(ok true)');
    assertEquals(receipt2.result, '(ok false)');
  },
});

Clarinet.test({
  name: 'purchase-order-contract: create-vault with sufficient collateral',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const block = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'create-vault',
        [types.uint(600), types.uint(2500000), types.uint(400), types.uint(30)],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectUint(1);
  },
});

// Clarinet.test({
//   name: "purchase-order-contract: create-vault with insufficient collateral",
//   async fn(chain: Chain, accounts: Map<string, Account>) {
//     const wallet_1 = accounts.get("wallet_1")!;
//     const block = chain.mineBlock([
//       Tx.contractCall("taral-purchase-order-v1", "create-vault", [types.uint(10), types.uint(10000), types.uint(400), types.uint(30)], wallet_1.address),
//     ]);

//     block.receipts[0].result.expectErr().expectUint(1001);
//   },
// });

Clarinet.test({
  name: 'purchase-order-contract: create-vault with invalid loan amount',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const block = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'create-vault',
        [types.uint(500), types.uint(2500000), types.uint(0), types.uint(30)],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(404);
  },
});

Clarinet.test({
  name: 'purchase-order-contract: create-vault with invalid duration',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const block = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'create-vault',
        [
          types.uint(500),
          types.uint(2500000),
          types.uint(400),
          types.uint(100),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(405);
  },
});

// Clarinet.test({
//   name: "purchase-order-contract: repay-loan with sufficient repayment",
//   async fn(chain: Chain, accounts: Map<string, Account>) {
//     const wallet_1 = accounts.get("wallet_1")!;

//     let block = chain.mineBlock([
//       Tx.contractCall("taral-purchase-order-v1", "create-vault", [types.uint(500), types.uint(2500000), types.uint(400), types.uint(30)], wallet_1.address),
//     ]);

//     console.log("RESULT:::")
//     console.log(block.receipts[0].result);

//     block = chain.mineBlock([
//       Tx.contractCall("taral-purchase-order-v1", "repay-loan", [types.uint(1), types.uint(450)], wallet_1.address),
//     ]);

//     block.receipts[0].result.expectOk().expectUint(200);
//   },
// });

// Clarinet.test({
//   name: "purchase-order-contract: repay-loan with insufficient repayment",
//   async fn(chain: Chain, accounts: Map<string, Account>) {
//     const wallet_1 = accounts.get("wallet_1")!;

//     chain.mineBlock([
//       Tx.contractCall("taral-purchase-order-v1", "create-vault", [types.uint(500), types.uint(2500000), types.uint(400), types.uint(30)], wallet_1.address),
//     ]);

//     const block = chain.mineBlock([
//       Tx.contractCall("taral-purchase-order-v1", "repay-loan", [types.uint(1), types.uint(100)], wallet_1.address),
//     ]);

//     block.receipts[0].result.expectErr().expectUint(401);
//   },
// });

// Clarinet.test({
//   name: "purchase-order-contract: repay-loan with non-existent vault",
//   async fn(chain: Chain, accounts: Map<string, Account>) {
//     const wallet_1 = accounts.get("wallet_1")!;

//     const block = chain.mineBlock([
//       Tx.contractCall("taral-purchase-order-v1", "repay-loan", [types.uint(2), types.uint(200)], wallet_1.address),
//     ]);

//     block.receipts[0].result.expectErr().expectUint(1003);
//   },
// });

Clarinet.test({
  name: 'purchase-order-contract: liquidate-vault with undercollateralized vault',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;

    chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'create-vault',
        [types.uint(10), types.uint(100000), types.uint(67400), types.uint(30)],
        wallet_1.address
      ),
    ]);

    // Simulate a decrease in the value of the collateral by adjusting the oracle prices
    chain.mineBlock([
      Tx.contractCall(
        '.dummy-oracle',
        'set-btc-price',
        [types.uint(1)],
        wallet_1.address
      ),
      Tx.contractCall(
        '.dummy-oracle',
        'set-stx-price',
        [types.uint(1)],
        wallet_1.address
      ),
    ]);

    const block = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'liquidate',
        [types.uint(1)],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: 'purchase-order-contract: liquidate-vault with overcollateralized vault',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;

    chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'create-vault',
        [types.uint(500), types.uint(2500000), types.uint(400), types.uint(30)],
        wallet_1.address
      ),
    ]);

    const block = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order-v1',
        'liquidate',
        [types.uint(1)],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(406);
  },
});
