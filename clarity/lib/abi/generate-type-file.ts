import { getRelativeImportPath } from ".";
import { ClarityAbi } from "../clarity/types";
import { toCamelCase } from "../utils";
import { makeTypes } from "./utils";

export const generateTypesFile = (
  abi: ClarityAbi,
  contractName: string,
  relativeImportPath: string
) => {
  const name = toCamelCase(contractName, true);
  const typings = makeTypes(abi);
  const fileContents = `import { Transaction } from '${relativeImportPath}lib/transaction';
import { ClarityTypes } from '${relativeImportPath}lib/clarity/types';

// prettier-ignore

export interface ${name}Contract {
${typings}
}
`;

  return fileContents;
};


export const generateMockTypesFile = (
  abi: ClarityAbi,
  contractName: string,
  relativeImportPath: string
) => {
  const name = toCamelCase(contractName, true);
  const typings = makeTypes(abi);
  const fileContents = `import { Transaction } from '${relativeImportPath}/transaction';
import { ClarityTypes } from '${relativeImportPath}/types';

// prettier-ignore

export interface ${name}Contract {
${typings}
}
`;

  return fileContents;
};