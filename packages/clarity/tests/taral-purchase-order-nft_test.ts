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
  name: "Purchase Order NFT: should be able to MINT and get last token ID",

  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    // Mint a token for wallet_1
    let mintTx = await chain.mineBlock([
      Tx.contractCall(
        "taral-purchase-order-nft",
        "mint",
        [types.uint(1), types.principal(wallet_1.address)],
        deployer.address,
      ),
    ]);

    assertEquals(mintTx.receipts[0].result, "(ok true)");

    // Check the last token ID
    let lastTokenId = await chain.callReadOnlyFn(
      "taral-purchase-order-nft",
      "get-last-token-id",
      [],
      deployer.address,
    );
    assertEquals(lastTokenId.result, "(ok u1)");
  },
});

Clarinet.test({
  name: "Purchase Order NFT: should be able to SET and GET token URIs",

  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    // Mint a token for wallet_1
    let mintTx = await chain.mineBlock([
      Tx.contractCall(
        "taral-purchase-order-nft",
        "mint",
        [types.uint(1), types.principal(wallet_1.address)],
        deployer.address,
      ),
    ]);
    assertEquals(mintTx.receipts[0].result, "(ok true)");

    // Set token URI for token ID 1
    let uri =
      "ipfs://bafybeidntmydwppanpzvvz4clnp5ngbsyd6vd2aheppbnsuogh442s3kyu/";
    let setUriTx = await chain.mineBlock([
      Tx.contractCall(
        "taral-purchase-order-nft",
        "set-token-uri",
        [types.uint(1), types.ascii(uri)],
        deployer.address,
      ),
    ]);
    assertEquals(setUriTx.receipts[0].result, "(ok true)");

    // Get token URI for token ID 1
    let tokenUri = await chain.callReadOnlyFn(
      "taral-purchase-order-nft",
      "get-token-uri",
      [types.uint(1)],
      deployer.address,
    );
    assertEquals(tokenUri.result, `(ok (some "${uri}"))`);
  },
});

Clarinet.test({
  name: "Purchase Order NFT: should be able to transfer NFT from one account to another",

  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    // Mint a token for wallet_1
    let mintTx = await chain.mineBlock([
      Tx.contractCall(
        "taral-purchase-order-nft",
        "mint",
        [types.uint(1), types.principal(wallet_1.address)],
        deployer.address,
      ),
    ]);
    assertEquals(mintTx.receipts[0].result, "(ok true)");

    // Transfer token ID 1 from wallet_1 to wallet_2
    let transferTx = await chain.mineBlock([
      Tx.contractCall(
        "taral-purchase-order-nft",
        "transfer",
        [
          types.uint(1),
          types.principal(wallet_1.address),
          types.principal(wallet_2.address),
        ],
        wallet_1.address,
      ),
    ]);
    assertEquals(transferTx.receipts[0].result, "(ok true)");

    // Check the new owner of token ID 1
    let newOwner = await chain.callReadOnlyFn(
      "taral-purchase-order-nft",
      "get-owner",
      [types.uint(1)],
      deployer.address,
    );
    assertEquals(newOwner.result, `(ok (some ${wallet_2.address}))`);
  },
});

Clarinet.test({
  name: "Purchase Order NFT: should be able to burn NFT by providing the token ID",

  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    // Mint a token for wallet_1
    await chain.mineBlock([
      Tx.contractCall(
        "taral-purchase-order-nft",
        "mint",
        [types.uint(1), types.principal(wallet_1.address)],
        deployer.address,
      ),
    ]);
    //Burn the minted token
    //NOTE: only the token owner can call the burn function
    let burnToken = await chain.mineBlock([
      Tx.contractCall(
        "taral-purchase-order-nft",
        "burn",
        [types.uint(1), types.principal(wallet_1.address)],
        deployer.address,
      ),
    ]);
    assertEquals(burnToken.receipts[0].result, "(ok true)");
  },
});
