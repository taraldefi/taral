import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoOracleV11Contract {
  fetchPrice: (token: string) => Transaction<{
    "last-block": number;
  "last-price-in-cents": number
      }, null>;
  setOracleOwner: (address: string) => Transaction<boolean, number>;
  updatePrice: (token: string, price: number) => Transaction<number, number>;
  getPrice: (token: string) => Promise<{
    "last-block": number;
  "last-price-in-cents": number
      }>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRNOTWHITELISTED: () => Promise<number>;
  lastBlock: () => Promise<number>;
  lastPriceInCents: () => Promise<number>;
  oracleOwner: () => Promise<string>;
  prices: (key: {
    "token": string
      }) => Promise<{
    "last-block": number;
  "last-price-in-cents": number
      } | null>;
}
