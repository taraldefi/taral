import {
  contractWithSubDirectory,
  getContractNameFromPath,
  toCamelCase,
} from "../utils";
import { getRelativeImportPath } from "./get-relative-import-path";

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
  const varName = toCamelCase(contractName);
  const contractType = `${contractTitle}Contract`;

  const relativeImportPath = getRelativeImportPath(subFolder);

  const fileContents = `
import { Contract } from '${relativeImportPath}shared/types';
import { proxy } from '${relativeImportPath}shared/test-utils/proxy';
import { BaseProvider } from '${relativeImportPath}shared/providers/base-provider';

import type { ${contractType} } from './types';
import { ${contractTitle}Interface } from './abi';

export type { ${contractType} } from './types';

export const ${varName}Contract = (provider: BaseProvider) => {
  const contract = proxy<${contractType}>(${contractTitle}Interface, provider);
  return contract;
};

export const ${varName}Info: Contract<${contractType}> = {
  contract: ${varName}Contract,
  address: '${address}',
  contractFile: '${contractWithSubDirectory(contractName, subFolder)}',
};
`;

  return fileContents;
}
