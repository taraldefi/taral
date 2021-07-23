import { writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { getContractNameFromPath } from "../shared/utils/contract-name-for-path";
import { toCamelCase } from "../shared/utils/to-camel-case";
import { CONTRACTS, GENERATION_FOLDER } from "./contracts";

export async function generateProjectIndexFile(
  contracts: CONTRACTS[]
): Promise<void> {
  const imports: string[] = [];
  const exports: string[] = [];
  const contractMap: string[] = [];

  //     let accounts = '';
  //     if ('accounts' in config) {
  //       accounts = `\n\n// prettier-ignore
  //   export const accounts = ${JSON.stringify(config.accounts, null, 2)};`;
  //     }
  contracts.forEach((contract) => {
    const contractName = getContractNameFromPath(contract);
    const contractVar = toCamelCase(contractName);
    const contractInfo = `${contractVar}Info`;
    const contractInterface = `${toCamelCase(contractName, true)}Contract`;
    const dirName = dirname(contract);
    const importPath = `'./${join(dirName || ".", contractName)}'`;

    const _import = `import { ${contractInfo} } from ${importPath};`;
    imports.push(_import);

    const _export = `export type { ${contractInterface} } from ${importPath};`;
    exports.push(_export);

    const map = `${contractVar}: ${contractInfo},`;
    contractMap.push(map);
  });

  const file = `${imports.join("\n")}
  ${exports.join("\n")}
  
  export const contracts = {
    ${contractMap.join("\n  ")}
  };
  `;
  await writeFile(resolve(GENERATION_FOLDER, "index.ts"), file);
}
