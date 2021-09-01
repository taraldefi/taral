import { accumulative } from "./accumulative"
import { blackjack } from "./blackjack"
import * as utils from './utils';

// order by descending value, minus the inputs approximate fee
function utxoScore (x: { value: number }, feeRate: number) {
    return x.value - (feeRate * utils.inputBytes(x))
  }
  
export function coinSelect (utxos: any[], outputs: any, feeRate: number) {
    utxos = utxos.concat().sort(function (a, b) {
      return utxoScore(b, feeRate) - utxoScore(a, feeRate)
    })
  
    // attempt to use the blackjack strategy first (no change output)
    var base = blackjack(utxos, outputs, feeRate)
    if (base.inputs) return base;
  
    // else, try the accumulative strategy
    return accumulative(utxos, outputs, feeRate)
  }