import { ClarityAbi } from "../clarity";
import { getContractNameFromPath, toCamelCase } from "../utils";

function generateInterfaceForFileInternal({
  contractFile,
  imports,
  abi,
}: {
  contractFile: string;
  imports: string;
  abi: ClarityAbi;
}) {
  const contractName = getContractNameFromPath(contractFile);
  const variableName = toCamelCase(contractName, true);
  const abiString = JSON.stringify(abi, null, 2);

  const fileContents = `
  ${imports}';

  export const ${variableName}Interface: ClarityAbi = ${abiString};`;

  return fileContents;
}

export function generateInterfaceFile({
  contractFile,
  relativeImportPath,
  abi,
}: {
  contractFile: string;
  relativeImportPath: string;
  abi: ClarityAbi;
}) {
  const imports = `import { ClarityAbi } from '${relativeImportPath}lib/clarity/types`;
  return generateInterfaceForFileInternal({
    abi,
    contractFile,
    imports,
  });
}

export function generateMockInterfaceFile({
  contractFile,
  relativeImportPath,
  abi,
}: {
  contractFile: string;
  relativeImportPath: string;
  abi: ClarityAbi;
}) {
  const imports = `import { ClarityAbi } from '${relativeImportPath}/clarity/types`;
  return generateInterfaceForFileInternal({
    abi,
    contractFile,
    imports,
  });
}
