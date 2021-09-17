import * as utils from "./utils";

export function blackjack(
    utxos: string | any[],
    outputs: any[],
    feeRate: number
): any {
    if (!isFinite(utils.uintOrNaN(feeRate))) return {};

    var bytesAccum = utils.transactionBytes([], outputs);

    var inAccum = 0;
    var inputs = [];
    var outAccum = utils.sumOrNaN(outputs);
    var threshold = utils.dustThreshold({}, feeRate);

    for (var i = 0; i < utxos.length; ++i) {
        var input = utxos[i];
        var inputBytes = utils.inputBytes(input);
        var fee = feeRate * (bytesAccum + inputBytes);
        var inputValue = utils.uintOrNaN(input.value);

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
