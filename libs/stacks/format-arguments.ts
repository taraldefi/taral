import { ClarityAbiFunction, ClarityValue } from "@stacks/transactions";
import { parseToCV } from "lib-shared";

export function formatArguments(
  func: ClarityAbiFunction,
  args: any[]
): ClarityValue[] {
  const formatted = args.map((arg, index) => {
    const { type } = func.args[index];
    const argCV = parseToCV(arg, type);
    return argCV;
  });

  return formatted;
}
