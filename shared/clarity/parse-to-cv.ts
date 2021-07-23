import {
  ClarityAbi as _ClarityAbi,
  ClarityAbiType,
  ClarityValue,
  getTypeString,
  uintCV,
  standardPrincipalCV,
  contractPrincipalCV,
  intCV,
  trueCV,
  falseCV,
  isClarityAbiPrimitive,
  isClarityAbiBuffer,
  isClarityAbiList,
  isClarityAbiOptional,
  isClarityAbiResponse,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiTuple,
  bufferCVFromString,
  stringAsciiCV,
  stringUtf8CV,
  noneCV,
  someCV,
} from "@stacks/transactions";

/**
 * Convert string input to Clarity value based on contract ABI data. Only handles Clarity
 * primitives and buffers. Responses, optionals, tuples and lists are not supported.
 *
 * @param {string} input - string to be parsed into Clarity value
 * @param {ClarityAbiType} type - the contract function argument object
 *
 * @returns {ClarityValue} returns a Clarity value
 */
export function parseToCV(input: string, type: ClarityAbiType): ClarityValue {
  const typeString = getTypeString(type);
  if (isClarityAbiPrimitive(type)) {
    if (type === "uint128") {
      return uintCV(input);
    } else if (type === "int128") {
      return intCV(input);
    } else if (type === "bool") {
      if (input.toLowerCase() === "true") {
        return trueCV();
      } else if (input.toLowerCase() === "false") {
        return falseCV();
      } else {
        throw new Error(`Invalid bool value: ${input}`);
      }
    } else if (type === "principal" || type === "trait_reference") {
      if (input.includes(".")) {
        const [address, contractName] = input.split(".");
        return contractPrincipalCV(address, contractName);
      } else {
        return standardPrincipalCV(input);
      }
    } else {
      throw new Error(
        `Contract function contains unsupported Clarity ABI type: ${typeString}`
      );
    }
  } else if (isClarityAbiBuffer(type)) {
    const inputLength = Buffer.from(input).byteLength;
    if (inputLength > type.buffer.length) {
      throw new Error(
        `Input exceeds specified buffer length limit of ${type.buffer.length}`
      );
    }
    return bufferCVFromString(input);
  } else if (isClarityAbiStringAscii(type)) {
    if (input.length > type["string-ascii"].length) {
      throw new Error(
        `Input exceeds specified string-ascii length limit of ${type["string-ascii"].length}`
      );
    }
    return stringAsciiCV(input);
  } else if (isClarityAbiStringUtf8(type)) {
    if (input.length > type["string-utf8"].length) {
      throw new Error(
        `Input exceeds specified string-utf8 length limit of ${type["string-utf8"].length}`
      );
    }
    return stringUtf8CV(input);
  } else if (isClarityAbiResponse(type)) {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`
    );
  } else if (isClarityAbiOptional(type)) {
    if (!input) return noneCV();
    return someCV(parseToCV(input, type.optional));
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`
    );
  } else if (isClarityAbiTuple(type)) {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`
    );
  } else if (isClarityAbiList(type)) {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`
    );
  } else {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`
    );
  }
}
