import * as utils from "./utils";
export function allIn(utxos: string | any[], outputs: any[], feeRate: number) {
    if (!isFinite(utils.uintOrNaN(feeRate))) return {};

    var bytesAccum = utils.transactionBytes([], outputs);

    var inAccum = 0;
    var inputs = [];

    for (var i = 0; i < utxos.length; ++i) {
        var input = utxos[i];
        var inputBytes = utils.inputBytes(input);
        var inputValue = utils.uintOrNaN(input.value);

        bytesAccum += inputBytes;
        inAccum += inputValue;
        inputs.push(input);
    }

    return utils.finalize(inputs, outputs, feeRate);
}
