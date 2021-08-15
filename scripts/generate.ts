import { readFileSync } from "fs";
import { CONTRACT_FOLDER } from "../shared/constants";
import { generateFilesForContract } from "../shared/abi";
import { createDefaultTestProvider } from "../shared/default-test-provider";
import { contractWithSubDirectory } from "../shared/utils/contract-with-subdirectory";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { getContractNameFromPath } from "../shared/utils/contract-name-for-path";
import { toCamelCase } from "../shared/utils/to-camel-case";
import { getClarinetAccounts } from "../shared/configuration";
import { Logger } from "../shared/logger";

const GENERATION_FOLDER = "src//";

interface IProject {
  configuration: IProjectConfiguration[];
}

interface IProjectConfiguration {
  name: string;
  description: string;
  subfolder: string;
  contracts: string[];
}

interface IContractGroup {
  subFolder: string;
  contracts: string[];
}

async function generateAbis(groups: IContractGroup[], deployerAddress: string): Promise<void> {
  const provider = await createDefaultTestProvider();

  for (let group of groups) {
    for (let contract of group.contracts) {
      await generateFilesForContract({
        contractFile: contractWithSubDirectory(contract, group.subFolder),
        outputFolder: GENERATION_FOLDER,
        contractAddress: deployerAddress,
        subFolder: group.subFolder,
        provider,
      });
    }
  }
}

async function generateProjectIndexFile(
  groups: IContractGroup[]
): Promise<void> {
  const imports: string[] = [];
  const exports: string[] = [];
  const contractMap: string[] = [];

  for (let group of groups) {
    for (let contract of group.contracts) {
      const contractName = getContractNameFromPath(contract);
      const contractVar = toCamelCase(contractName);
      const contractInfo = `${contractVar}Info`;
      const contractInterface = `${toCamelCase(contractName, true)}Contract`;
      const importPath = `'./${group.subFolder}/${contractName}'`;
      const _import = `import { ${contractInfo} } from ${importPath};`;
      imports.push(_import);

      const _export = `export type { ${contractInterface} } from ${importPath};`;
      exports.push(_export);

      const map = `${contractVar}: ${contractInfo},`;
      contractMap.push(map);
    }
  }

  const file = `${imports.join("\n")}
    ${exports.join("\n")}
    
    export const contracts = {
      ${contractMap.join("\n  ")}
    };
    `;
  await writeFile(resolve(GENERATION_FOLDER, "index.ts"), file);
}

async function generate() {

  const cwd = process.cwd();
  const contracts = await getClarinetAccounts(cwd);

  const contractsConfigurationFile = readFileSync(
    `./${CONTRACT_FOLDER}/contracts.json`,
    "utf-8"
  );

  const project: IProject = JSON.parse(contractsConfigurationFile);

  var contractGroups: IContractGroup[] = project.configuration.map(
    (configuration) => {
      return {
        contracts: configuration.contracts,
        subFolder: configuration.subfolder,
      };
    }
  );

  Logger.debug(`Generating interfaces with deployment contract ${contracts.deployer.address}`)
  await generateAbis(contractGroups, contracts.deployer.address);
  await generateProjectIndexFile(contractGroups);
}

generate();
