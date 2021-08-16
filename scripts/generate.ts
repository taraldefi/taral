import { readFileSync } from "fs";

import { 
  CONTRACT_FOLDER, 
  generateFilesForContract, 
  createDefaultTestProvider, 
  contractWithSubDirectory,
  getContractNameFromPath,
  toCamelCase, getClarinetAccounts, Logger } from "../lib";

import { writeFile } from "fs/promises";
import { resolve } from "path";

interface IProject {
  outputDirectory: string;
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

async function generateAbis(
  groups: IContractGroup[],
  deployerAddress: string,
  outputFolder: string
): Promise<void> {
  const provider = await createDefaultTestProvider();

  for (let group of groups) {
    for (let contract of group.contracts) {
      await generateFilesForContract({
        contractFile: contractWithSubDirectory(contract, group.subFolder),
        outputFolder: outputFolder,
        contractAddress: deployerAddress,
        subFolder: group.subFolder,
        provider,
      });
    }
  }
}

async function generateProjectIndexFile(
  groups: IContractGroup[],
  outputFolder: string
): Promise<void> {
  for (let group of groups) {
    const imports: string[] = [];
    const exports: string[] = [];
    const contractMap: string[] = [];

    for (let contract of group.contracts) {
      const contractName = getContractNameFromPath(contract);
      const contractVar = toCamelCase(contractName);
      const contractInfo = `${contractVar}Info`;
      const contractInterface = `${toCamelCase(contractName, true)}Contract`;
      const importPath = `'./${contractName}'`;
      const _import = `import { ${contractInfo} } from ${importPath};`;
      imports.push(_import);

      const _export = `export type { ${contractInterface} } from ${importPath};`;
      exports.push(_export);

      const map = `${contractVar}: ${contractInfo},`;
      contractMap.push(map);
    }

    const file = `${imports.join("\n")}
    ${exports.join("\n")}
    
    export const contracts = {
      ${contractMap.join("\n  ")}
    };
    `;

    var subFolder = group.subFolder;

    var fullOutputFolder = `${outputFolder}/${subFolder}/`

    await writeFile(resolve(fullOutputFolder, "index.ts"), file);
  }
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

  Logger.debug(
    `Generating interfaces with deployment contract ${contracts.deployer.address}`
  );

  await generateAbis(
    contractGroups,
    contracts.deployer.address,
    project.outputDirectory
  );

  await generateProjectIndexFile(contractGroups, project.outputDirectory);
}

generate();
