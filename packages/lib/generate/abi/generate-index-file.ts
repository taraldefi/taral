import { getContractNameFromPath, toCamelCase, toPascalCase } from "lib-shared";

function generateIndexFileInternal({
  contractFile,
  imports,
  address,
}: {
  contractFile: string;
  subFolder: string;
  imports: string;
  address: string;
}) {
  const contractName = getContractNameFromPath(contractFile);

  const contractTitle = toCamelCase(contractName, true);
  const varName = toPascalCase(contractName);
  const contractType = `${contractTitle}Contract`;

  const fileContents = `
  ${imports}
  export type { ${contractType} } from './types';

  export const node${varName}Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<${contractType}>(${contractTitle}Interface, provider);
    return contract;
  };

  export const node${varName}Info: NodeContract<${contractType}> = {
    contract: node${varName}Contract,
    address: '${address}',
    contractFile: '${contractFile}',
  };
  
  export const web${varName}Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<${contractType}>(${contractTitle}Interface, provider);
    return contract;
  };

  export const web${varName}Info: WebContract<${contractType}> = {
    contract: web${varName}Contract,
    address: '${address}',
    contractFile: '${contractFile}',
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

  const imports = `
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ${contractType} } from './types';
  import { ${contractTitle}Interface } from './abi';`;

  return generateIndexFileInternal({
    contractFile,
    subFolder,
    imports,
    address,
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
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ${contractType} } from './types';
  import { ${contractTitle}Interface } from './abi';`;

  return generateIndexFileInternal({
    contractFile,
    subFolder,
    imports,
    address,
  });
}
