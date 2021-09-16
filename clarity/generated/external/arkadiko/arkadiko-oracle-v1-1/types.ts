import { Transaction } from "../../../../lib/transaction";

export interface ArkadikoOracleV11Contract {
  fetchPrice: (token: string) => Transaction<
    {
      "last-block": bigint;
      "last-price-in-cents": bigint;
    },
    null
  >;
  setOracleOwner: (address: string) => Transaction<boolean, bigint>;
  updatePrice: (
    token: string,
    price: number | bigint
  ) => Transaction<bigint, bigint>;
  getPrice: (token: string) => Promise<{
    "last-block": bigint;
    "last-price-in-cents": bigint;
  }>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  ERRNOTWHITELISTED: () => Promise<bigint>;
  lastBlock: () => Promise<bigint>;
  lastPriceInCents: () => Promise<bigint>;
  oracleOwner: () => Promise<string>;
  prices: (key: { token: string }) => Promise<{
    "last-block": bigint;
    "last-price-in-cents": bigint;
  } | null>;
}
