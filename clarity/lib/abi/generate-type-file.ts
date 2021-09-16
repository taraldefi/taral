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
  contractName: string,
  relativeImportPath: string
) => {
  const imports = `
  import { Transaction } from '${relativeImportPath}lib/transaction';
  import { ClarityTypes } from '${relativeImportPath}lib/clarity/types`;

  return generateTypesFileInternal(abi, contractName, imports);
};

export const generateMockTypesFile = (
  abi: ClarityAbi,
  contractName: string,
  relativeImportPath: string
) => {
  const imports = `
  import { Transaction } from '${relativeImportPath}/transaction';
  import { ClarityTypes } from '${relativeImportPath}/types`;

  return generateTypesFileInternal(abi, contractName, imports);
};
