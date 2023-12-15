import { Cl } from "@stacks/transactions";
import { expect, it } from "vitest";
import { describeConditional } from "./describe.skip";
import { RUN_CHAINHOOK_TESTS } from "./constants";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const WALLET_3 = accounts.get("wallet_3")!;
const DEPLOYER = accounts.get("deployer")!;
const describeOrSkip = describeConditional(RUN_CHAINHOOK_TESTS);

describeOrSkip("Should test marketplace chainhook [ value added only if ran with the chainhook backend ]", () => {
  it("Ensure we can run the chainhook integration", () => {
    const setWhitelistedResult = simnet.callPublicFn(
      "nft-marketplace",
      "set-whitelisted",
      [
        Cl.contractPrincipal(
          "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "sip009-nft",
        ),
        Cl.bool(true),
      ],
      DEPLOYER,
    );

    expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

    let mint = simnet.callPublicFn(
      "sip009-nft",
      "mint",
      [Cl.standardPrincipal(WALLET_1)],
      DEPLOYER,
    );

    expect(mint.result).toBeOk(Cl.uint(1));

    const nftId = simnet.callReadOnlyFn(
      "sip009-nft",
      "get-last-token-id",
      [],
      DEPLOYER,
    );

    expect(nftId.result).toBeOk(Cl.uint(1));

    const startAuctionResult = simnet.callPublicFn(
      "nft-marketplace",
      "start-auction",
      [
        Cl.contractPrincipal(
          "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "sip009-nft",
        ),
        Cl.tuple({
          "token-id": Cl.uint(1),
          "start-block": Cl.uint(100),
          "end-block": Cl.uint(1000),
          "start-bid": Cl.uint(100),
          "reserve-price": Cl.uint(1000),
        }),
      ],
      WALLET_1,
    );

    var nftTransferEvent = startAuctionResult.events[0].data as any;

    expect(nftTransferEvent.asset_identifier).toStrictEqual(
      `${DEPLOYER}.sip009-nft::sip009-nft`,
    );

    expect(nftTransferEvent.sender, `${WALLET_1}`);
    expect(nftTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
    expect(nftTransferEvent.value, 1 as any);

    const getOwnerResult = simnet.callReadOnlyFn(
      "sip009-nft",
      "get-owner",
      [Cl.uint(1)],
      WALLET_1,
    );

    expect(getOwnerResult.result).toBeOk(
      Cl.some(Cl.contractPrincipal(`${DEPLOYER}`, "nft-marketplace")),
    );

    for (let i = 0; i < 500; i++) {
      simnet.mineEmptyBlock();
    }

    let placeBidResponse = simnet.callPublicFn(
      "nft-marketplace",
      "place-bid",
      [
        Cl.uint(0), // auction id
        Cl.uint(1200), // bid amount
      ],
      WALLET_2,
    );

    expect(placeBidResponse.result).toBeOk(Cl.bool(true));

    var stxTransferEvent = startAuctionResult.events[0].data as any;

    expect(stxTransferEvent.sender, `${WALLET_2}`);
    expect(stxTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
    expect(stxTransferEvent.amount, 1200 as any);

    placeBidResponse = simnet.callPublicFn(
      "nft-marketplace",
      "place-bid",
      [
        Cl.uint(0), // auction id
        Cl.uint(5000), // bid amount
      ],
      WALLET_3,
    );

    expect(placeBidResponse.result).toBeOk(Cl.bool(true));

    var highestBidTransferEvent = startAuctionResult.events[0].data as any;
    var previousBidTransferEvent = startAuctionResult.events[1].data as any;

    expect(highestBidTransferEvent.sender, `${WALLET_3}`);
    expect(highestBidTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
    expect(highestBidTransferEvent.amount, 5000 as any);

    expect(previousBidTransferEvent.sender, `${DEPLOYER}.nft-marketplace`);
    expect(previousBidTransferEvent.recipient, `${WALLET_2}`);
    expect(previousBidTransferEvent.amount, 1200 as any);

    let cancelAuctionResult = simnet.callPublicFn(
      "nft-marketplace",
      "cancel-auction",
      [
        Cl.uint(0), // auction id
        Cl.contractPrincipal(
          "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "sip009-nft",
        ),
      ],
      WALLET_2,
    );

    expect(cancelAuctionResult.result).toBeErr(Cl.uint(2001));

    cancelAuctionResult = simnet.callPublicFn(
      "nft-marketplace",
      "cancel-auction",
      [
        Cl.uint(0), // auction id
        Cl.contractPrincipal(
          "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "sip009-nft",
        ),
      ],
      WALLET_3,
    );

    expect(cancelAuctionResult.result).toBeErr(Cl.uint(2001));

    cancelAuctionResult = simnet.callPublicFn(
      "nft-marketplace",
      "cancel-auction",
      [
        Cl.uint(0), // auction id
        Cl.contractPrincipal(
          "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "sip009-nft",
        ),
      ],
      WALLET_1,
    );

    expect(cancelAuctionResult.result).toBeOk(Cl.bool(true));
  });
});
