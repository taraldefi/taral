
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralOracleV1Contract {
      addPrice: (source: string, msg: Buffer, sig: Buffer) => Transaction<boolean, bigint>;
  addPrices: (prices: {
  "msg": Buffer;
  "sig": Buffer;
  "src": string
    }[]) => Transaction<boolean, null>;
  addSource: (source: string, publicKey: Buffer) => Transaction<boolean, bigint>;
  revokeSource: (source: string) => Transaction<boolean, bigint>;
  checkSource: (source: string) => Promise<{
  "public-key": Buffer
    } | null>;
  extractAmount: (msg: Buffer) => Promise<bigint>;
  extractSymbol: (msg: Buffer) => Promise<string>;
  extractTimestamp: (msg: Buffer) => Promise<bigint>;
  getPrice: (source: string, symbol: string) => Promise<{
  "amount": bigint;
  "height": bigint;
  "timestamp": bigint
    } | null>;
  verifySignature: (msg: Buffer, signature: Buffer, publicKey: Buffer) => Promise<boolean>;
  BUFF_TO_UINT8: () => Promise<Buffer[]>;
  UINT8_TO_ASCII: () => Promise<string[]>;
  contractOwner: () => Promise<string>;
  errIncorrectSignature: () => Promise<ClarityTypes.Response<null, bigint>>;
  errNotOwner: () => Promise<ClarityTypes.Response<null, bigint>>;
  errOlderTimestamp: () => Promise<ClarityTypes.Response<null, bigint>>;
  errRecover: () => Promise<ClarityTypes.Response<null, bigint>>;
  ethPreamble: () => Promise<Buffer>;
  offsetsAmount: () => Promise<bigint[]>;
  offsetsSymbolLength: () => Promise<bigint[]>;
  offsetsSymbolOffset: () => Promise<bigint[]>;
  offsetsTimestamp: () => Promise<bigint[]>;
  oracleData: (key: {
  "source": string;
  "symbol": string
    }) => Promise<{
  "amount": bigint;
  "height": bigint;
  "timestamp": bigint
    } | null>;
  sources: (key: {
  "source": string
    }) => Promise<{
  "public-key": Buffer
    } | null>;
  }