import { ClarityAbi } from "../clarity/types";
import { toCamelCase } from "../utils";
import { makeTypes } from "./utils";

function generateTypesFileInternal(
  abi: ClarityAbi,
  contractName: string,
  imports: string
) {
  const name = toCamelCase(contractName, true);
  const typings = makeTypes(abi);
  const fileContents = `
  ${imports}

  export interface ${name}Contract {
    ${typings}
  }`;

  return fileContents;
}

export const generateTypesFile = (
  abi: ClarityAbi,
  contractName: string
) => {
  const imports = `
  import { Transaction } from 'taral-shared';
  import { ClarityTypes } from 'taral-shared'`;

  return generateTypesFileInternal(abi, contractName, imports);
};

export const generateMockTypesFile = (
  abi: ClarityAbi,
  contractName: string
) => {
  const imports = `
  import { Transaction } from 'taral-shared';
  import { ClarityTypes } from 'tarak-shared`;

  return generateTypesFileInternal(abi, contractName, imports);
};
