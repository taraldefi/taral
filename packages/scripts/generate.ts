import { readFileSync } from "fs";

import {
  CONTRACT_FOLDER,
  generateFilesForContract,
  createDefaultTestProvider,
  contractWithSubDirectory,
  getContractNameFromPath,
  toCamelCase,
  getClarinetAccounts,
  Logger,
  submitAnalisysForContract,
  testContractWithSubdirectory,
  TEST_CONTRACT_FOLDER,
} from "taral-shared";

import { writeFile } from "fs/promises";
import { resolve } from "path";
import { NativeClarityBinProvider } from "taral-shared";

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

async function submitTestContractForAnalysis(
  testGroups: IContractGroup[],
  provider: NativeClarityBinProvider,
  deployerAddress: string
): Promise<void> {
  for (let group of testGroups) {
    for (let contract of group.contracts) {
      await submitAnalisysForContract({
        contractFile: testContractWithSubdirectory(contract, group.subFolder),
        contractAddress: deployerAddress,
        subFolder: group.subFolder,
        provider,
        outputFolder: "",
        generate: false,
      });
    }
  }
}

async function generateTestContractAbis(
  testGroups: IContractGroup[],
  provider: NativeClarityBinProvider,
  deployerAddress: string,
  outputFolder: string
) {
  for (let group of testGroups) {
    for (let contract of group.contracts) {
      await submitAnalisysForContract({
        contractFile: testContractWithSubdirectory(contract, group.subFolder),
        contractAddress: deployerAddress,
        subFolder: group.subFolder,
        outputFolder: outputFolder,
        provider,
        generate: true,
      });
    }
  }
}

async function generateAbis(
  groups: IContractGroup[],
  provider: NativeClarityBinProvider,
  deployerAddress: string,
  outputFolder: string
): Promise<void> {
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

    var fullOutputFolder = `${outputFolder}/${subFolder}/`;

    await writeFile(resolve(fullOutputFolder, "index.ts"), file);
  }
}

function getProject(path: string): IProject {
  const contractsConfigurationFile = readFileSync(path, "utf-8");

  const project: IProject = JSON.parse(contractsConfigurationFile);

  return project;
}

function groupProject(project: IProject): IContractGroup[] {
  var contractGroups: IContractGroup[] = project.configuration.map(
    (configuration) => {
      return {
        contracts: configuration.contracts,
        subFolder: configuration.subfolder,
      };
    }
  );

  return contractGroups;
}

async function generate(regenerateMockContracts: boolean) {
  const cwd = `${process.cwd()}/clarity/`;
  const contracts = await getClarinetAccounts(cwd);

  const project: IProject = getProject(`./${CONTRACT_FOLDER}/contracts.json`);
  const testProject: IProject = getProject(
    `./${TEST_CONTRACT_FOLDER}/contracts.json`
  );

  Logger.debug(
    `Generating interfaces with deployment contract ${contracts.deployer.address}`
  );

  const provider: NativeClarityBinProvider = await createDefaultTestProvider();

  var contractGroups = groupProject(project);
  var testContractGroups = groupProject(testProject);

  if (regenerateMockContracts) {
    await generateTestContractAbis(
      testContractGroups,
      provider,
      contracts.deployer.address,
      testProject.outputDirectory
    );
    await generateProjectIndexFile(
      testContractGroups,
      testProject.outputDirectory
    );
  } else {
    await submitTestContractForAnalysis(
      testContractGroups,
      provider,
      contracts.deployer.address
    );
  }

  await generateAbis(
    contractGroups,
    provider,
    contracts.deployer.address,
    project.outputDirectory
  );

  await generateProjectIndexFile(contractGroups, project.outputDirectory);
}

generate(true);
