import { pubKeyfromPrivKey, publicKeyToString } from "@stacks/transactions";

// from Stacks config.toml file
export const ADDR1 = "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR";
export const ADDR2 = "ST31Q2S6CXS4WTQS92CR1GCGD0W9PRHSFZZH8XXRH";
export const ADDR3 = "ST22ZZ99DRQQZ3HATGYRKCYKVZY78Z1ZAWBA7QE2P";
export const ADDR4 = "ST2604KQ6A2TD9EP1FMAJ6BESC22H0E557KQHB7CV";
export const testnetKeys: { secretKey: string; stacksAddress: string }[] = [
  {
    secretKey:
      "2b14b8c3d746d2d5fd8fdfdc55200dacb46f276dceff2f90f8342eed35e92a1501",
    stacksAddress: ADDR1,
  },
  {
    secretKey:
      "793ec7a986c3510d582c3ad3522c6ebd258861508aedbeb5b6de0182295eab6d01",
    stacksAddress: ADDR2,
  },
  {
    secretKey:
      "4db14c26f229e1c28f043da8095872dbacaec0b9c6d65808952e2ca2470abb7101",
    stacksAddress: ADDR3,
  },
  {
    secretKey:
      "020ad734559ecca79065deda2b8a2c9ada4b3d078407d098ccbfb46fb4b441c401",
    stacksAddress: ADDR4,
  },
];

export const testnetKeyMap: Record<
  string,
  { address: string; secretKey: string; pubKey: string }
> = Object.fromEntries(
  testnetKeys.map((t) => [
    t.stacksAddress,
    {
      address: t.stacksAddress,
      secretKey: t.secretKey,
      pubKey: publicKeyToString(pubKeyfromPrivKey(t.secretKey)),
    },
  ])
);
