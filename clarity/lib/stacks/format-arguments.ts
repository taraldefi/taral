import {
  ClarityAbiFunction,
  ClarityValue,
  cvToString,
  isClarityAbiBuffer,
} from "@stacks/transactions";
import { IMetadata, instanceOfMetadata } from "../providers/types";
import { parseToCV } from '..';

export function formatArguments(
  func: ClarityAbiFunction,
  args: any[]
): [string[], IMetadata] {

  let metadataConfig: IMetadata = {
    discriminator: 'metadata',
    sender: ''
  };

  for(var i = 0; i < args.length; i++) {
    if (instanceOfMetadata(args[i])) {
      metadataConfig = args[i] as IMetadata;
      break;
    }
  }

  var argsWithoutMetadata = args.filter((x) => x !== metadataConfig);

  var formatted = argsWithoutMetadata.map((arg, index) => {
    const { type } = func.args[index];
    if (type === "trait_reference") {
      return `'${arg}`;
    }
    const argCV = parseToCV(arg, type);
    const cvString = cvToString(argCV);
    if (type === "principal") {
      return `'${cvString}`;
    }
    return cvString;
  });

  return [formatted, metadataConfig];
}

export function formatReadonlyArguments(
  func: ClarityAbiFunction,
  args: any[]
): [ClarityValue[], IMetadata] {

  console.log('Formatting arguments');
  console.log(JSON.stringify(args));

  var metadata = args.filter((arg) => instanceOfMetadata(arg));
  if (metadata.length > 1) {
    throw new TypeError("More than one metadata objects");
  }

  var metadataConfig = metadata[0];

  var argsWithoutMetadata =
    metadata.length == 1 ? args.filter((x) => x !== metadataConfig) : args;

  var formatted = argsWithoutMetadata.map((arg, index) => {

    const { type } = func.args[index];
    // console.log(`parsing ${JSON.stringify(arg)} of type ${JSON.stringify(type)}`);

    const argCV = parseToCV(arg, type);
    return argCV;
  });

  console.log(`argswithoutmetadata count`, argsWithoutMetadata.length);
  console.log(JSON.stringify(argsWithoutMetadata));

  console.log('formatted count', formatted.length);
  console.log(JSON.stringify(formatted));


  return [formatted, metadataConfig];
}
