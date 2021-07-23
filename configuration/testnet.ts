import { pubKeyfromPrivKey, publicKeyToString } from "@stacks/transactions";

// from Stacks config.toml file
// export const ADDR1 = "ST1HJ4TYWQV3MCSP2T751GDN39PTENCX72HPQYDCM";
// export const ADDR2 = "STRVCQ501XZVWWWBWQTC3BCWKYG8WWER1BSCD9S8";
// export const ADDR3 = "ST1MFSFY91ZZFCVQFRPHYH2HS258D962RPK3M8CW5";
// export const ADDR4 = "ST1Z6E1B35N3A8C974PPCMQPVJ10SCEJA68PMPQ95";
// export const testnetKeys: { secretKey: string; stacksAddress: string }[] = [
//   {
//     secretKey:
//       "d8b6639a9dc544cb52accaa701b45c9a3320519101fae0cb90c8066ec7e1d6c601",
//     stacksAddress: ADDR1,
//   },
//   {
//     secretKey:
//       "95ef516f20d266f6972ccb72382e74a0de7e872dcef764924d6da0c688723a0301",
//     stacksAddress: ADDR2,
//   },
//   {
//     secretKey:
//       "97a0af6784770897281b17e628a794b31f6acad422624c166df02ad4b7fd5c5f01",
//     stacksAddress: ADDR3,
//   },
//   {
//     secretKey:
//       "8d61a7c285049ec0a98a02c425f9717c6c9cd103fa4e7bf0f6a30559eedf6dab01",
//     stacksAddress: ADDR4,
//   },
// ];

// from Stacks config.toml file
export const ADDR1 = "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH";
export const ADDR2 = "ST26FVX16539KKXZKJN098Q08HRX3XBAP541MFS0P";
export const ADDR3 = "ST3CECAKJ4BH08JYY7W53MC81BYDT4YDA5M7S5F53";
export const ADDR4 = "ST31HHVBKYCYQQJ5AQ25ZHA6W2A548ZADDQ6S16GP";
export const testnetKeys: { secretKey: string; stacksAddress: string }[] = [
  {
    secretKey:
      "b8d99fd45da58038d630d9855d3ca2466e8e0f89d3894c4724f0efc9ff4b51f001",
    stacksAddress: ADDR1,
  },
  {
    secretKey:
      "3a4e84abb8abe0c1ba37cef4b604e73c82b1fe8d99015cb36b029a65099d373601",
    stacksAddress: ADDR2,
  },
  {
    secretKey:
      "052cc5b8f25b1e44a65329244066f76c8057accd5316c889f476d0ea0329632c01",
    stacksAddress: ADDR3,
  },
  {
    secretKey:
      "9aef533e754663a453984b69d36f109be817e9940519cc84979419e2be00864801",
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
