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
      )
    ]);
    let block = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order',
        'check-if-user-holds-tal-token',
        [types.principal(exporter_wallet.address)],
        deployer.address
      )
    ]);
    let block2 = chain.mineBlock([
      Tx.contractCall(
        'taral-purchase-order',
        'check-if-user-holds-tal-token',
        [types.principal(exporter2_wallet.address)],
        deployer.address
      )
    ]);

    let [receipt] = block.receipts;
    let [receipt2] = block2.receipts;
    assertEquals(receipt.result, '(ok true)');
    assertEquals(receipt2.result, '(ok false)');
  }
});
