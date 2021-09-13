import {
  ClarityAbiFunction,
  ClarityValue,
} from "@stacks/transactions";
import { IMetadata, instanceOfMetadata } from "../providers/types";
import { parseToCV } from '..';

export function formatArguments(
  func: ClarityAbiFunction,
  args: any[]
): [ClarityValue[], IMetadata] {

  var metadata = args.filter((arg) => instanceOfMetadata(arg));
  if (metadata.length > 1) {
    throw new TypeError("More than one metadata objects");
  }

  var metadataConfig = metadata[0];

  var argsWithoutMetadata =
    metadata.length == 1 ? args.filter((x) => x !== metadataConfig) : args;

  var formatted = argsWithoutMetadata.map((arg, index) => {
    const { type } = func.args[index];
    const argCV = parseToCV(arg, type);
    return argCV;
  });

  return [formatted, metadataConfig];
}