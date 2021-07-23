import { simpleCounterInfo } from "./simple-counter";
import { sip10FtStandardInfo } from "./sip-10-ft-standard";
import { counterCoinInfo } from "./counter-coin";
import { counterInfo } from "./counter";
export type { SimpleCounterContract } from "./simple-counter";
export type { Sip10FtStandardContract } from "./sip-10-ft-standard";
export type { CounterCoinContract } from "./counter-coin";
export type { CounterContract } from "./counter";

export const contracts = {
  simpleCounter: simpleCounterInfo,
  sip10FtStandard: sip10FtStandardInfo,
  counterCoin: counterCoinInfo,
  counter: counterInfo,
};
