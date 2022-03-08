import { Transaction } from "lib-shared";

export interface TaralOracleV1Contract {
  fetchPrice: (token: string) => Transaction<
    {
      decimals: bigint;
      "last-block": bigint;
      "last-price": bigint;
    },
    null
  >;
  setOracleOwner: (address: string) => Transaction<boolean, bigint>;
  updatePrice: (
    token: string,
    price: number | bigint,
    decimals: number | bigint
  ) => Transaction<bigint, bigint>;
  getPrice: (token: string) => Promise<{
    decimals: bigint;
    "last-block": bigint;
    "last-price": bigint;
  }>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  ERRNOTWHITELISTED: () => Promise<bigint>;
  lastBlock: () => Promise<bigint>;
  lastPrice: () => Promise<bigint>;
  oracleOwner: () => Promise<string>;
  prices: (key: { token: string }) => Promise<{
    decimals: bigint;
    "last-block": bigint;
    "last-price": bigint;
  } | null>;
}
