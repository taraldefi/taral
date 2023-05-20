import { ClarityAbi, toCamelCase } from "lib-shared";
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

export const generateTypesFile = (abi: ClarityAbi, contractName: string) => {
    const imports = `
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'`;

    return generateTypesFileInternal(abi, contractName, imports);
};

export const generateMockTypesFile = (
    abi: ClarityAbi,
    contractName: string
) => {
    const imports = `
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'`;

    return generateTypesFileInternal(abi, contractName, imports);
};
