import * as utils from "./utils";

export function blackjack(
    utxos: string | any[],
    outputs: any[],
    feeRate: number
): any {
    if (!isFinite(utils.uintOrNaN(feeRate))) return {};

    let bytesAccum = utils.transactionBytes([], outputs);

    let inAccum = 0;
    const inputs = [];
    const outAccum = utils.sumOrNaN(outputs);
    const threshold = utils.dustThreshold({}, feeRate);

    for (let i = 0; i < utxos.length; ++i) {
        const input = utxos[i];
        const inputBytes = utils.inputBytes(input);
        const fee = feeRate * (bytesAccum + inputBytes);
        const inputValue = utils.uintOrNaN(input.value);

        // would it waste value?
        if (inAccum + inputValue > outAccum + fee + threshold) continue;

        bytesAccum += inputBytes;
        inAccum += inputValue;
        inputs.push(input);

        // go again?
        if (inAccum < outAccum + fee) continue;

        return utils.finalize(inputs, outputs, feeRate);
    }

    return { fee: feeRate * bytesAccum };
}
