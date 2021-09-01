import * as utils from './utils';
export function allIn (utxos: string | any[], outputs: any[], feeRate: number) {
    if (!isFinite(utils.uintOrNaN(feeRate))) return {}
  
    var bytesAccum = utils.transactionBytes([], outputs)
  
    var inAccum = 0
    var inputs = []
    var outAccum = utils.sumOrNaN(outputs)
    var threshold = utils.dustThreshold({}, feeRate)
  
    for (var i = 0; i < utxos.length; ++i) {
      var input = utxos[i]
      var inputBytes = utils.inputBytes(input)
      var fee = feeRate * (bytesAccum + inputBytes)
      var inputValue = utils.uintOrNaN(input.value)
  
      bytesAccum += inputBytes
      inAccum += inputValue
      inputs.push(input)
    }
  
    return utils.finalize(inputs, outputs, feeRate)
  }