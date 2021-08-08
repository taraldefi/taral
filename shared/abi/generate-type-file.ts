import { getRelativeImportPath } from ".";
import { ClarityAbi } from "../clarity/types";
import { toCamelCase } from "../utils";
import { makeTypes } from "./utils";

export const generateTypesFile = (
  abi: ClarityAbi,
  contractName: string,
  subFolder: string
) => {
  const name = toCamelCase(contractName, true);
  const typings = makeTypes(abi);
  const relativeImportPath = getRelativeImportPath(subFolder);
  const fileContents = `import { Transaction } from '${relativeImportPath}shared/transaction';
import { ClarityTypes } from '${relativeImportPath}shared/clarity/types';
import { IMetadata } from '${relativeImportPath}shared/providers/types';

// prettier-ignore

export interface ${name}Contract {
${typings}
}
`;

  return fileContents;
};
