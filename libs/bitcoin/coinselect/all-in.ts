import * as utils from "./utils";
export function allIn(utxos: string | any[], outputs: any[], feeRate: number) {
  if (!isFinite(utils.uintOrNaN(feeRate))) return {};
  let bytesAccum = utils.transactionBytes([], outputs);

  let inAccum = 0;
  const inputs = [];

  for (let i = 0; i < utxos.length; ++i) {
    const input = utxos[i];
    const inputBytes = utils.inputBytes(input);
    const inputValue = utils.uintOrNaN(input.value);

    bytesAccum += inputBytes;
    inAccum += inputValue;
    inputs.push(input);
  }

  return utils.finalize(inputs, outputs, feeRate);
}
