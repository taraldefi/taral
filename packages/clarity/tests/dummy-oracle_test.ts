// deno-lint-ignore-file no-explicit-any
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Clarinet, Tx, Chain, Account, types } from '../src/dependencies.ts';
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { assertEquals } from '../src/dependencies.ts';

Clarinet.test({
  name: 'oracle: log BTC and STX prices',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;

    const btcPriceCall = Tx.contractCall(
      'dummy-oracle',
      'get-btc-price',
      [],
      wallet_1.address
    );
    const stxPriceCall = Tx.contractCall(
      'dummy-oracle',
      'get-stx-price',
      [],
      wallet_1.address
    );

    const block = chain.mineBlock([btcPriceCall, stxPriceCall]);

    const btcPriceResult = block.receipts[0].result.expectOk();
    const stxPriceResult = block.receipts[1].result.expectOk();

    console.log('BTC Price:', btcPriceResult);
    console.log('STX Price:', stxPriceResult);
  },
});
