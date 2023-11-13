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
  name: "Ensure blacklister cannot start an auction",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.bool(true),
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
        [types.principal(wallet_1.address)],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall("sip009-nft", "get-last-token-id", [], deployer.address),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let backlist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "update-blacklisted",
        [types.principal(wallet_1.address), types.bool(true)],
        deployer.address
      ),
    ]);

    backlist.receipts[0].result.expectOk();

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "start-auction",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.tuple({
            "token-id": types.uint(1),
            "start-block": types.uint(100),
            "end-block": types.uint(1000),
            "start-bid": types.uint(100),
            "reserve-price": types.uint(1000),
          }),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr();
  },
});

Clarinet.test({
  name: "Ensure that a bid cannot be placed on an auction by a blacklister",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_2 = accounts.get("wallet_2")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.bool(true),
        ],
        deployer.address
      ),
    ]);

    whitelist.receipts[0].result.expectOk();

    // chain.advance_chain_tip(1000);

    // mint an nft on wallet

    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [types.principal(wallet_1.address)],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall("sip009-nft", "get-last-token-id", [], deployer.address),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "start-auction",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.tuple({
            "token-id": types.uint(1),
            // TODO: currently (current-time (unwrap! (get-block-info? time u0) err-block-info)) returns (some u0)
            "start-block": types.uint(100),
            "end-block": types.uint(1000),
            "start-bid": types.uint(100),
            "reserve-price": types.uint(1000),
          }),
        ],
        wallet_1.address
      ),
    ]);
    block.receipts[0].result.expectOk();

    chain.mineEmptyBlockUntil(500);

    let backlist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "update-blacklisted",
        [types.principal(wallet_2.address), types.bool(true)],
        deployer.address
      ),
    ]);

    backlist.receipts[0].result.expectOk();

    // Place a bid
    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "place-bid",
        [
          types.uint(0), // auction id
          types.uint(200), // bid amount
        ],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectErr();
  },
});

Clarinet.test({
  name: "Ensure that an auction cannot be successfully ended by a blacklister",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_2 = accounts.get("wallet_2")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.bool(true),
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
        [types.principal(wallet_1.address)],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall("sip009-nft", "get-last-token-id", [], deployer.address),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "start-auction",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.tuple({
            "token-id": types.uint(1),
            // TODO: currently (current-time (unwrap! (get-block-info? time u0) err-block-info)) returns (some u0)
            "start-block": types.uint(100),
            "end-block": types.uint(1000),
            "start-bid": types.uint(100),
            "reserve-price": types.uint(1000),
          }),
        ],
        wallet_1.address
      ),
    ]);
    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(
      nftTransferEvent.asset_identifier,
      `${deployer.address}.sip009-nft::sip009-nft`
    );
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(
      nftTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(nftTransferEvent.value, types.uint(1));

    let checkOwner = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-owner",
        [types.uint(1)],
        wallet_1.address
      ),
    ]);

    checkOwner.receipts[0].result.expectOk();

    assertEquals(
      checkOwner.receipts[0].result,
      `(ok (some ${deployer.address}.nft-marketplace))`
    );

    chain.mineEmptyBlockUntil(500);

    // Place a bid
    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "place-bid",
        [
          types.uint(0), // auction id
          types.uint(1200), // bid amount
        ],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);

    var stxTransferEvent = block.receipts[0].events[0].stx_transfer_event;

    assertEquals(stxTransferEvent.sender, `${wallet_2.address}`);
    assertEquals(
      stxTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(stxTransferEvent.amount, "1200");

    // Advance the time
    chain.mineEmptyBlockUntil(2000);

    let backlist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "update-blacklisted",
        [types.principal(wallet_1.address), types.bool(true)],
        deployer.address
      ),
    ]);

    backlist.receipts[0].result.expectOk();

    // End the auction
    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "end-auction",
        [
          types.uint(0), // auction id
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr();
  },
});

Clarinet.test({
  name: "Ensure auction cannot be cancelled by maker if blacklisted",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_2 = accounts.get("wallet_2")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;
    let wallet_3 = accounts.get("wallet_3")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.bool(true),
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
        [types.principal(wallet_1.address)],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall("sip009-nft", "get-last-token-id", [], deployer.address),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "start-auction",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.tuple({
            "token-id": types.uint(1),
            // TODO: currently (current-time (unwrap! (get-block-info? time u0) err-block-info)) returns (some u0)
            "start-block": types.uint(100),
            "end-block": types.uint(1000),
            "start-bid": types.uint(100),
            "reserve-price": types.uint(1000),
          }),
        ],
        wallet_1.address
      ),
    ]);
    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(
      nftTransferEvent.asset_identifier,
      `${deployer.address}.sip009-nft::sip009-nft`
    );
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(
      nftTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(nftTransferEvent.value, types.uint(1));

    let checkOwner = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-owner",
        [types.uint(1)],
        wallet_1.address
      ),
    ]);

    checkOwner.receipts[0].result.expectOk();

    assertEquals(
      checkOwner.receipts[0].result,
      `(ok (some ${deployer.address}.nft-marketplace))`
    );

    chain.mineEmptyBlockUntil(500);

    // Place a bid
    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "place-bid",
        [
          types.uint(0), // auction id
          types.uint(1200), // bid amount
        ],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);

    var stxTransferEvent = block.receipts[0].events[0].stx_transfer_event;

    assertEquals(stxTransferEvent.sender, `${wallet_2.address}`);
    assertEquals(
      stxTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(stxTransferEvent.amount, "1200");

    // Place a bid
    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "place-bid",
        [
          types.uint(0), // auction id
          types.uint(5000), // bid amount
        ],
        wallet_3.address
      ),
    ]);

    var events = block.receipts[0].events;
    var highestBidTransferEvent = events[0].stx_transfer_event;
    var previousBidTransferEvent = events[1].stx_transfer_event;

    assertEquals(highestBidTransferEvent.sender, `${wallet_3.address}`);
    assertEquals(
      highestBidTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(highestBidTransferEvent.amount, "5000");

    assertEquals(
      previousBidTransferEvent.sender,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(previousBidTransferEvent.recipient, `${wallet_2.address}`);
    assertEquals(previousBidTransferEvent.amount, "1200");

    block.receipts[0].result.expectOk().expectBool(true);

    let backlist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "update-blacklisted",
        [types.principal(wallet_1.address), types.bool(true)],
        deployer.address
      ),
    ]);

    backlist.receipts[0].result.expectOk();

    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-auction",
        [
          types.uint(0), // auction id
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr();
  },
});

Clarinet.test({
  name: "Ensure that maker cannot list an nft for sale as a fixed listing if blacklisted",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.bool(true),
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
        [types.principal(wallet_1.address)],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall("sip009-nft", "get-last-token-id", [], deployer.address),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let backlist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "update-blacklisted",
        [types.principal(wallet_1.address), types.bool(true)],
        deployer.address
      ),
    ]);

    backlist.receipts[0].result.expectOk();

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.tuple({
            "token-id": types.uint(1),
            price: types.uint(1000),
          }),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr();
  },
});

Clarinet.test({
  name: "Ensure that maker cannot cancel a fixed listing if blacklisted",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    // whitelist the contract

    let whitelist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "set-whitelisted",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.bool(true),
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
        [types.principal(wallet_1.address)],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall("sip009-nft", "get-last-token-id", [], deployer.address),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.tuple({
            "token-id": types.uint(1),
            price: types.uint(1000),
          }),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(
      nftTransferEvent.asset_identifier,
      `${deployer.address}.sip009-nft::sip009-nft`
    );
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(
      nftTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(nftTransferEvent.value, types.uint(1));

    let backlist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "update-blacklisted",
        [types.principal(wallet_1.address), types.bool(true)],
        deployer.address
      ),
    ]);

    backlist.receipts[0].result.expectOk();

    let cancel = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-fixed-price-listing",
        [
          types.uint(0),
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
        ],
        wallet_1.address
      ),
    ]);

    cancel.receipts[0].result.expectErr();
  },
});

Clarinet.test({
  name: "Ensure recipient cannot purchase a fixed listing if blacklisted",
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
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.bool(true),
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
        [types.principal(wallet_1.address)],
        deployer.address
      ),
    ]);

    mint.receipts[0].result.expectOk();

    let nftId = chain.mineBlock([
      Tx.contractCall("sip009-nft", "get-last-token-id", [], deployer.address),
    ]);

    nftId.receipts[0].result.expectOk().expectUint(1);

    let block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "list-fixed-price",
        [
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
          types.tuple({
            "token-id": types.uint(1),
            price: types.uint(1000),
          }),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(
      nftTransferEvent.asset_identifier,
      `${deployer.address}.sip009-nft::sip009-nft`
    );
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(
      nftTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`
    );
    assertEquals(nftTransferEvent.value, types.uint(1));

    var ownership = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-owner",
        [types.uint(1)],
        wallet_2.address
      ),
    ]);

    assertEquals(
      ownership.receipts[0].result,
      `(ok (some ${deployer.address}.nft-marketplace))`
    );

    let backlist = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "update-blacklisted",
        [types.principal(wallet_2.address), types.bool(true)],
        deployer.address
      ),
    ]);

    backlist.receipts[0].result.expectOk();

    let purchase = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "purchase-fixed-price-listing",
        [
          types.uint(0), // valid listing id
          types.principal(wallet_2.address),
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"
          ),
        ],
        wallet_2.address
      ),
    ]);

    purchase.receipts[0].result.expectErr();
  },
});
