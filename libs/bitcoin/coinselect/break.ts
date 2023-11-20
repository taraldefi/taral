import * as utils from "./utils";

export function broken(
  utxos: any[],
  output: { value?: any; script?: any },
  feeRate: number,
) {
  if (!isFinite(utils.uintOrNaN(feeRate))) return {};

  let bytesAccum = utils.transactionBytes(utxos, []);
  const value = utils.uintOrNaN(output.value);
  const inAccum = utils.sumOrNaN(utxos);
  if (!isFinite(value) || !isFinite(inAccum))
    return { fee: feeRate * bytesAccum };

  const outputBytes = utils.outputBytes(output);
  let outAccum = 0;
  const outputs = [];

  while (true) {
    const fee = feeRate * (bytesAccum + outputBytes);

    // did we bust?
    if (inAccum < outAccum + fee + value) {
      // premature?
      if (outAccum === 0) return { fee: fee };

      break;
    }

    bytesAccum += outputBytes;
    outAccum += value;
    outputs.push(output);
  }

  return utils.finalize(utxos, outputs, feeRate);
}
