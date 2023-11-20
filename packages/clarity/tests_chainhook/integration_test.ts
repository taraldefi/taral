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
  name: "Chainhook integration test",
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
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft",
          ),
          types.bool(true),
        ],
        deployer.address,
      ),
    ]);

    whitelist.receipts[0].result.expectOk();

    // mint an nft on wallet
    let mint = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "mint",
        [types.principal(wallet_1.address)],
        deployer.address,
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
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft",
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
        wallet_1.address,
      ),
    ]);
    block.receipts[0].result.expectOk();

    var nftTransferEvent = block.receipts[0].events[0].nft_transfer_event;
    assertEquals(
      nftTransferEvent.asset_identifier,
      `${deployer.address}.sip009-nft::sip009-nft`,
    );
    assertEquals(nftTransferEvent.sender, `${wallet_1.address}`);
    assertEquals(
      nftTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`,
    );
    assertEquals(nftTransferEvent.value, types.uint(1));

    let checkOwner = chain.mineBlock([
      Tx.contractCall(
        "sip009-nft",
        "get-owner",
        [types.uint(1)],
        wallet_1.address,
      ),
    ]);

    checkOwner.receipts[0].result.expectOk();

    assertEquals(
      checkOwner.receipts[0].result,
      `(ok (some ${deployer.address}.nft-marketplace))`,
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
        wallet_2.address,
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);

    var stxTransferEvent = block.receipts[0].events[0].stx_transfer_event;

    assertEquals(stxTransferEvent.sender, `${wallet_2.address}`);
    assertEquals(
      stxTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`,
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
        wallet_3.address,
      ),
    ]);

    var events = block.receipts[0].events;
    var highestBidTransferEvent = events[0].stx_transfer_event;
    var previousBidTransferEvent = events[1].stx_transfer_event;

    assertEquals(highestBidTransferEvent.sender, `${wallet_3.address}`);
    assertEquals(
      highestBidTransferEvent.recipient,
      `${deployer.address}.nft-marketplace`,
    );
    assertEquals(highestBidTransferEvent.amount, "5000");

    assertEquals(
      previousBidTransferEvent.sender,
      `${deployer.address}.nft-marketplace`,
    );
    assertEquals(previousBidTransferEvent.recipient, `${wallet_2.address}`);
    assertEquals(previousBidTransferEvent.amount, "1200");

    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-auction",
        [
          types.uint(0), // auction id
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft",
          ),
        ],
        wallet_2.address,
      ),
    ]);

    block.receipts[0].result.expectErr();

    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-auction",
        [
          types.uint(0), // auction id
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft",
          ),
        ],
        wallet_3.address,
      ),
    ]);

    block.receipts[0].result.expectErr();

    block = chain.mineBlock([
      Tx.contractCall(
        "nft-marketplace",
        "cancel-auction",
        [
          types.uint(0), // auction id
          types.principal(
            "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft",
          ),
        ],
        deployer.address,
      ),
    ]);

    block.receipts[0].result.expectOk();
  },
});
