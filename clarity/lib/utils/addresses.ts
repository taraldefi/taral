import { c32ToB58, b58ToC32, c32addressDecode } from 'c32check';

/**
 * stacksAddressToBtcAddress
 * Wrapper for c32ToB58. Converts a Stacks address to a Bitcoin address
 */
export const stacksAddressToBtcAddress = (stacksAddress: string) =>
  c32ToB58(stacksAddress);

/**
 * btcAddressToStacksAddress
 * Wrapper for b58ToC32. Converts a Bitcoin address to a Stacks address
 */
export const btcAddressToStacksAddress = (btcAddress: string) =>
  b58ToC32(btcAddress);

/**
 * validateStacksAddress
 */
export const validateStacksAddress = (stacksAddress: string) => {
  let valid = false;
  try {
    if (c32addressDecode(stacksAddress)) {
      valid = true;
    }
  } catch (e) {
    valid = false;
    throw new Error('Not a valid Stacks address.');
  }
  return valid;
};
