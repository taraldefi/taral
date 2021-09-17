// baseline estimates, used to improve performance
export const TX_EMPTY_SIZE = 4 + 1 + 1 + 4;
export const TX_INPUT_BASE = 32 + 4 + 1 + 4;
export const TX_INPUT_PUBKEYHASH = 107;
export const TX_OUTPUT_BASE = 8 + 1;
export const TX_OUTPUT_PUBKEYHASH = 25;

export function inputBytes(input: any) {
  return (
    TX_INPUT_BASE + (input.script ? input.script.length : TX_INPUT_PUBKEYHASH)
  );
}

export function outputBytes(output: { script?: any }) {
  return (
    TX_OUTPUT_BASE +
    (output.script ? output.script.length : TX_OUTPUT_PUBKEYHASH)
  );
}

export function dustThreshold(_output: any, feeRate: number) {
  /* ... classify the output for input estimate  */
  return inputBytes({}) * feeRate;
}

export function transactionBytes(inputs: any[], outputs: any[]) {
  return (
    TX_EMPTY_SIZE +
    inputs.reduce(function (a, x) {
      return a + inputBytes(x);
    }, 0) +
    outputs.reduce(function (a, x) {
      return a + outputBytes(x);
    }, 0)
  );
}

export function uintOrNaN(v: number) {
  if (typeof v !== "number") return NaN;
  if (!isFinite(v)) return NaN;
  if (Math.floor(v) !== v) return NaN;
  if (v < 0) return NaN;
  return v;
}

export function sumForgiving(range: any[]) {
  return range.reduce(function (a, x) {
    return a + (isFinite(x.value) ? x.value : 0);
  }, 0);
}

export function sumOrNaN(range: any[]) {
  return range.reduce(function (a, x) {
    return a + uintOrNaN(x.value);
  }, 0);
}

export var BLANK_OUTPUT = outputBytes({});

export function finalize(inputs: any[], outputs: any[], feeRate: number) {
  var bytesAccum = transactionBytes(inputs, outputs);
  var feeAfterExtraOutput = feeRate * (bytesAccum + BLANK_OUTPUT);
  var remainderAfterExtraOutput =
    sumOrNaN(inputs) - (sumOrNaN(outputs) + feeAfterExtraOutput);

  // is it worth a change output?
  if (remainderAfterExtraOutput > 0) {
    outputs = outputs.concat({ value: remainderAfterExtraOutput });
  }

  var fee = sumOrNaN(inputs) - sumOrNaN(outputs);
  if (!isFinite(fee)) return { fee: feeRate * bytesAccum };

  return {
    inputs: inputs,
    outputs: outputs,
    fee: fee,
  };
}
