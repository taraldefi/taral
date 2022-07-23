import {
    ClarityAbiType,
    ClarityValue,
    contractPrincipalCV,
    intCV,
    isClarityAbiList,
    isClarityAbiOptional,
    isClarityAbiStringAscii,
    isClarityAbiStringUtf8,
    isClarityAbiTuple,
    listCV,
    noneCV,
    parseToCV as _parseToCV,
    someCV,
    stringAsciiCV,
    stringUtf8CV,
    tupleCV,
    uintCV
} from "@stacks/transactions";

type TupleInput = Record<string, any>;
type CVInput = string | boolean | TupleInput | number | bigint;
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
    return _parseToCV(input as string, type);
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
