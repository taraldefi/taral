import { ClarinetAccount, IMetadata } from "../../../clarity/lib";
import { clarinetAccounts } from "./jest-setup";

// Replace with client.estimatesmartfee() for testnet/mainnet
export const REGTEST_FEE_RATE = 50;
export const MIN_TX_CONFIRMATIONS = 1;

export const BOB_BTC = "mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC";
export const BOB_BTC_PK =
  "7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801";
export const BOB_STX = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
export const BOB_MNEMONIC =
  "sell invite acquire kitten bamboo drastic jelly vivid peace spawn twice guilt pave pen trash pretty park cube fragile unaware remain midnight betray rebuild";

// # mnemonic = "sell invite acquire kitten bamboo drastic jelly vivid peace spawn twice guilt pave pen trash pretty park cube fragile unaware remain midnight betray rebuild"
// # secret_key: 7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801
// # stx_address: ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5
// # btc_address: mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC
// address = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5"

export const ALICE_BTC = "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH";
export const ALICE_BTC_PK =
  "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601";
export const ALICE_STX = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";

// # mnemonic = "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
// # secret_key: 753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601
// # stx_address: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
// # btc_address: mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH
// address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"

export interface ITestContext {
  metadata: IMetadata;
}

export function getTestContext(): ITestContext {
  const firstWallet = getWallet();

  return {
    metadata: {
      discriminator: "metadata",
      sender: firstWallet.privateKey,
      address: firstWallet.address,
    }
  };
}

export function getWallet(): ClarinetAccount {
  return getWalletAtIndex(1);
}

function getWalletAtIndex(index: number): ClarinetAccount {
  var firstWallet = clarinetAccounts[`wallet_${index}`];
  return firstWallet;
}
