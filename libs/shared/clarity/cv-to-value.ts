import { ClarityType, ClarityValue } from "@stacks/transactions";
import { Logger } from "../logger";
import { bytesToHex } from "../utils";
import { principalToString } from "./principal-to-string";

export function cvToValue(val: ClarityValue): any {
    switch (val.type) {
        case ClarityType.BoolTrue:
            return true;
        case ClarityType.BoolFalse:
            return false;
        case ClarityType.Int:
            return val.value;
        case ClarityType.UInt:
            return val.value;
        case ClarityType.Buffer:
            Logger.debug("[CV TO VALUE]", `0x${bytesToHex(val.buffer)}`);
            return `0x${bytesToHex(val.buffer)}`;
        case ClarityType.OptionalNone:
            return null;
        case ClarityType.OptionalSome:
            return cvToValue(val.value);
        case ClarityType.ResponseErr:
            return cvToValue(val.value);
        case ClarityType.ResponseOk:
            return cvToValue(val.value);
        case ClarityType.PrincipalStandard:
        case ClarityType.PrincipalContract:
            return principalToString(val);
        case ClarityType.List:
            return val.list.map((v) => cvToValue(v));
        case ClarityType.Tuple:
            const result: { [key: string]: any } = {};
            Object.keys(val.data).forEach((key) => {
                result[key] = cvToValue(val.data[key]);
            });
            return result;
        case ClarityType.StringASCII:
            return val.data;
        case ClarityType.StringUTF8:
            return val.data;
    }
}
