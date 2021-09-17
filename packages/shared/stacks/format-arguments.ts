import { ClarityAbiFunction, ClarityValue } from "@stacks/transactions";
import { parseToCV } from "..";

export function formatArguments(
    func: ClarityAbiFunction,
    args: any[]
): ClarityValue[] {
    var formatted = args.map((arg, index) => {
        const { type } = func.args[index];
        const argCV = parseToCV(arg, type);
        return argCV;
    });

    return formatted;
}
