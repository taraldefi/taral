import {
    contractWithSubDirectory,
    getContractNameFromPath,
    toCamelCase
} from "../utils";

function generateIndexFileInternal({
    contractFile,
    imports,
    address,
    contractWithSubDirectory,
}: {
    contractFile: string;
    subFolder: string;
    imports: string;
    address: string;
    contractWithSubDirectory: string;
}) {
    const contractName = getContractNameFromPath(contractFile);

    const contractTitle = toCamelCase(contractName, true);
    const varName = toCamelCase(contractName);
    const contractType = `${contractTitle}Contract`;

    const fileContents = `
  ${imports}
  export type { ${contractType} } from './types';

  export const ${varName}Contract = (provider: BaseProvider) => {
    const contract = proxy<${contractType}>(${contractTitle}Interface, provider);
    return contract;
  };

  export const ${varName}Info: Contract<${contractType}> = {
    contract: ${varName}Contract,
    address: '${address}',
    contractFile: '${contractWithSubDirectory}',
  };`;

    return fileContents;
}

export function generateIndexFile({
    contractFile,
    subFolder,
    address,
}: {
    contractFile: string;
    subFolder: string;
    address: string;
}) {
    const contractName = getContractNameFromPath(contractFile);
    const contractTitle = toCamelCase(contractName, true);
    const contractType = `${contractTitle}Contract`;
    const contractFileWithSubDirectory = contractWithSubDirectory(
        contractName,
        subFolder
    );

    const imports = `
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ${contractType} } from './types';
  import { ${contractTitle}Interface } from './abi';`;

    return generateIndexFileInternal({
        contractFile,
        subFolder,
        imports,
        address,
        contractWithSubDirectory: contractFileWithSubDirectory,
    });
}

export function generateMockIndexFile({
    contractFile,
    subFolder,
    address,
}: {
    contractFile: string;
    subFolder: string;
    address: string;
}) {
    const contractName = getContractNameFromPath(contractFile);
    const contractTitle = toCamelCase(contractName, true);
    const contractType = `${contractTitle}Contract`;


    const imports = `
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ${contractType} } from './types';
  import { ${contractTitle}Interface } from './abi';`;

    return generateIndexFileInternal({
        contractFile,
        subFolder,
        imports,
        address,
        contractWithSubDirectory: contractWithSubDirectory(
            contractName,
            subFolder
        ),
    });
}
