import {
  ClarityAbiType,
  ClarityType,
  ClarityValue,
  contractPrincipalCV,
  falseCV,
  getTypeString,
  intCV,
  isClarityAbiBuffer,
  isClarityAbiList,
  isClarityAbiOptional,
  isClarityAbiPrimitive,
  isClarityAbiResponse,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiTuple,
  listCV,
  noneCV,
  parseToCV as _parseToCV,
  someCV,
  standardPrincipalCV,
  stringAsciiCV,
  stringUtf8CV,
  trueCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";

type TupleInput = Record<string, any>;
type CVInput = string | boolean | TupleInput | number | bigint;

interface BufferCV {
  readonly type: ClarityType.Buffer;
  readonly buffer: Buffer;
}

/**
 * Converts a buffer to BufferCV clarity type
 *
 * @param {buffer} buffer value to be converted to clarity type
 *
 * @returns {BufferCV} returns instance of type BufferCV
 *
 * @example
 * ```
 *  import { bufferCV } from '@stacks/transactions';
 *
 *  const buffer = Buffer.from('this is a test');
 *  const buf = bufferCV(buffer);
 *  // { type: 2, buffer: <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74> }
 *  const value = buf.buffer.toString();
 *  // this is a test
 * ```
 *
 * @visit
 * {@link https://github.com/hirosystems/stacks.js/blob/master/packages/transactions/tests/clarity.test.ts clarity test cases for more examples}
 */
const bufferCV = (buffer: Buffer): BufferCV => {
  if (buffer.length > 1000000) {
    throw new Error("Cannot construct clarity buffer that is greater than 1MB");
  }

  return { type: ClarityType.Buffer, buffer };
};

const bufferCVFromString = (string: string) => bufferCV(Buffer.from(string));

export function utf8ToBytes(content: string) {
  return new TextEncoder().encode(content);
}
/**
 * Convert string input to Clarity value based on contract ABI data. Only handles Clarity
 * primitives and buffers. Responses, optionals, tuples and lists are not supported.
 *
 * @param {string} input - string to be parsed into Clarity value
 * @param {ClarityAbiType} type - the contract function argument object
 *
 * @returns {ClarityValue} returns a Clarity value
 */
export function parseToCVInternal(
  input: string,
  type: ClarityAbiType,
): ClarityValue {
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
    } else if (type === "principal") {
      if (input.includes(".")) {
        const [address, contractName] = input.split(".");
        return contractPrincipalCV(address, contractName);
      } else {
        return standardPrincipalCV(input);
      }
    } else {
      throw new Error(
        `Contract function contains unsupported Clarity ABI type: ${typeString}`,
      );
    }
  } else if (isClarityAbiBuffer(type)) {
    const inputLength = Buffer.from(input).byteLength;
    if (inputLength > type.buffer.length) {
      throw new Error(
        `Input exceeds specified buffer length limit of ${type.buffer.length}`,
      );
    }
    return bufferCVFromString(input);
  } else if (isClarityAbiResponse(type)) {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`,
    );
  } else if (isClarityAbiOptional(type)) {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`,
    );
  } else if (isClarityAbiTuple(type)) {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`,
    );
  } else if (isClarityAbiList(type)) {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`,
    );
  } else {
    throw new Error(
      `Contract function contains unsupported Clarity ABI type: ${typeString}`,
    );
  }
}

export function parseToCV(input: CVInput, type: ClarityAbiType): ClarityValue {
  if (isClarityAbiTuple(type)) {
    if (typeof input !== "object") {
      throw new Error("Invalid tuple input");
    }
    const tuple: Record<string, ClarityValue> = {};
    type.tuple.forEach((key) => {
      const val = input[key.name];
      tuple[key.name] = parseToCV(val, key.type);
    });
    return tupleCV(tuple);
  } else if (isClarityAbiList(type)) {
    const inputs = input as any[];
    const values = inputs.map((input) => {
      return parseToCV(input, type.list.type);
    });
    return listCV(values);
  } else if (isClarityAbiOptional(type)) {
    if (!input) return noneCV();
    return someCV(parseToCV(input, type.optional));
  } else if (isClarityAbiStringAscii(type)) {
    if (typeof input !== "string") {
      throw new Error("Invalid string-ascii input");
    }
    return stringAsciiCV(input);
  } else if (isClarityAbiStringUtf8(type)) {
    if (typeof input !== "string") {
      throw new Error("Invalid string-ascii input");
    }
    return stringUtf8CV(input);
  } else if (type === "bool") {
    const inputString = typeof input === "boolean" ? input.toString() : input;
    return _parseToCV(inputString as string, type);
  } else if (type === "uint128") {
    const bigi = inputToBigInt(input);
    return uintCV(bigi.toString());
  } else if (type === "int128") {
    const bigi = inputToBigInt(input);
    return intCV(bigi.toString());
  } else if (type === "trait_reference") {
    if (typeof input !== "string")
      throw new Error("Invalid input for trait_reference");
    const [addr, name] = input.split(".");
    return contractPrincipalCV(addr, name);
  }

  return parseToCVInternal(input as string, type);
}

function inputToBigInt(input: CVInput) {
  const isBigInt = typeof input === "bigint";
  const isNumber = typeof input === "number";
  const isString = typeof input === "string";
  const isOk = isBigInt || isNumber || isString;
  if (!isOk) {
    throw new Error("Invalid input type for integer");
  }
  return BigInt(input);
}
