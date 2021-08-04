import { getRelativeImportPath } from ".";
import { ClarityAbi } from "../clarity";
import { getContractNameFromPath, toCamelCase } from "../utils";

export function generateInterfaceFile({
    contractFile,
    subFolder,
    abi,
}: {
    contractFile: string;
    subFolder: string;
    abi: ClarityAbi;
}) {
    const contractName = getContractNameFromPath(contractFile);
    const variableName = toCamelCase(contractName, true);
    const abiString = JSON.stringify(abi, null, 2);

    const relativeImportPath = getRelativeImportPath(subFolder);
    const fileContents = `import { ClarityAbi } from '${relativeImportPath}shared/clarity/types';

// prettier-ignore

export const ${variableName}Interface: ClarityAbi = ${abiString};
`;

    return fileContents;
}
