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

Clarinet.test({
  name: "Ensure that we can list an nft for sale as a fixed listing",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.bool(true)
        ],
        deployer.address
      ),
    ]);

    whitelist.receipts[0].result.expectOk();


    // mint an nft on wallet

    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-last-token-id",
        [],
        deployer.address
      ),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.tuple({
            "token-id": types.uint(1),
            "price": types.uint(1000)
          })
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.recipient, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.value, types.uint(1));
  },
});


Clarinet.test({
  name: "Ensure that we can cancel a fixed listing",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.bool(true)
        ],
        deployer.address
      ),
    ]);

    whitelist.receipts[0].result.expectOk();


    // mint an nft on wallet

    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-last-token-id",
        [],
        deployer.address
      ),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.tuple({
            "token-id": types.uint(1),
            "price": types.uint(1000)
          })
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.recipient, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.value, types.uint(1));

    let cancel = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-fixed-price-listing",
        [
          types.uint(0),
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
        ],
        wallet_1.address
      ),
    ]);

    cancel.receipts[0].result.expectOk();

    var nftTransferEvent = cancel.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.recipient, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.value, types.uint(1));
  },
});


Clarinet.test({
  name: "Ensure that we cannot cancel an invalid fixed listing",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.bool(true)
        ],
        deployer.address
      ),
    ]);

    whitelist.receipts[0].result.expectOk();


    // mint an nft on wallet

    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-last-token-id",
        [],
        deployer.address
      ),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.tuple({
            "token-id": types.uint(1),
            "price": types.uint(1000)
          })
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.recipient, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.value, types.uint(1));

    let cancel = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-fixed-price-listing",
        [
          types.uint(10), // invalid listing id
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
        ],
        wallet_1.address
      ),
    ]);

    cancel.receipts[0].result.expectErr();
  },
});



Clarinet.test({
  name: "Ensure that only the maker can cancel a fixed listing",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.bool(true)
        ],
        deployer.address
      ),
    ]);

    whitelist.receipts[0].result.expectOk();


    // mint an nft on wallet

    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-last-token-id",
        [],
        deployer.address
      ),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.tuple({
            "token-id": types.uint(1),
            "price": types.uint(1000)
          })
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.recipient, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.value, types.uint(1));

    let cancel = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-fixed-price-listing",
        [
          types.uint(0), // invalid listing id
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
        ],
        wallet_2.address
      ),
    ]);

    cancel.receipts[0].result.expectErr();
  },
});



Clarinet.test({
  name: "Ensure that the deployer can cancel an invalid fixed listing",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.bool(true)
        ],
        deployer.address
      ),
    ]);

    whitelist.receipts[0].result.expectOk();


    // mint an nft on wallet

    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-last-token-id",
        [],
        deployer.address
      ),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.tuple({
            "token-id": types.uint(1),
            "price": types.uint(1000)
          })
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.recipient, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.value, types.uint(1));

    let cancel = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-fixed-price-listing",
        [
          types.uint(0), // invalid listing id
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
        ],
        deployer.address
      ),
    ]);

    cancel.receipts[0].result.expectOk();

    var nftTransferEvent = cancel.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.recipient, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.value, types.uint(1));
  },
});



Clarinet.test({
  name: "Ensure that valid fixed listing can be purchased",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.bool(true)
        ],
        deployer.address
      ),
    ]);

    whitelist.receipts[0].result.expectOk();


    // mint an nft on wallet

    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-last-token-id",
        [],
        deployer.address
      ),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
          types.tuple({
            "token-id": types.uint(1),
            "price": types.uint(1000)
          })
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(nftTransferEvent.recipient, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.value, types.uint(1));


    var ownership = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-owner",
        [
          types.uint(1),
        ],
        wallet_2.address
      ),
    ]);

    assertEquals(ownership.receipts[0].result, `(ok (some ${deployer.address}.nft-marketplace))`)

    let purchase = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "purchase-fixed-price-listing",
        [
          types.uint(0), // valid listing id
          types.principal(wallet_2.address),
          types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft'),
        ],
        wallet_2.address
      ),
    ]);

    purchase.receipts[0].result.expectOk();

    var stxTransferEvent = purchase.receipts[0].events[0].stx_transfer_event;
    assertEquals(stxTransferEvent.sender, `${wallet_2.address}`);
    assertEquals(stxTransferEvent.recipient, `${wallet_1.address}`);
    assertEquals(stxTransferEvent.amount, '1000')

    var nftTransferEvent = purchase.receipts[0].events[1].nft_transfer_event;
    assertEquals(nftTransferEvent.asset_identifier, `${deployer.address}.sip009-nft::sip009-nft`);
    assertEquals(nftTransferEvent.sender, `${deployer.address}.nft-marketplace`);
    assertEquals(nftTransferEvent.recipient, `${wallet_2.address}`);
    assertEquals(nftTransferEvent.value, types.uint(1));
  },
});