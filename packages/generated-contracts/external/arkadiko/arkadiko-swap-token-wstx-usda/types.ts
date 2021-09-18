import { ClarityTypes, Transaction } from "taral-shared";

export interface ArkadikoSwapTokenWstxUsdaContract {
  burn: (
    recipient: string,
    amount: number | bigint
  ) => Transaction<boolean, bigint>;
  mint: (
    recipient: string,
    amount: number | bigint
  ) => Transaction<boolean, bigint>;
  transfer: (
    amount: number | bigint,
    sender: string,
    recipient: string,
    memo: Buffer | null
  ) => Transaction<boolean, bigint>;
  getBalance: (owner: string) => Promise<ClarityTypes.Response<bigint, null>>;
  getData: (owner: string) => Promise<
    ClarityTypes.Response<
      {
        balance: bigint;
        decimals: bigint;
        name: string;
        supply: bigint;
        symbol: string;
        uri: string | null;
      },
      null
    >
  >;
  getDecimals: () => Promise<ClarityTypes.Response<bigint, null>>;
  getName: () => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
  getTokenUri: () => Promise<ClarityTypes.Response<string | null, null>>;
  getTotalSupply: () => Promise<ClarityTypes.Response<bigint, null>>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
}
