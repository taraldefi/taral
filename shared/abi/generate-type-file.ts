import { ClarityAbi } from "../clarity/types";
import { makeTypes } from "./utils";
import { toCamelCase } from "../utils";

export const generateTypesFile = (abi: ClarityAbi, contractName: string) => {
  const name = toCamelCase(contractName, true);
  const typings = makeTypes(abi);
  const fileContents = `import { Transaction } from '../../shared/transaction';
import { ClarityTypes } from '../../shared/clarity/types';
import { IMetadata } from '../../shared/providers/types';

// prettier-ignore

export interface ${name}Contract {
${typings}
}
`;

  return fileContents;
};
