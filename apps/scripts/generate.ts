import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import {
  createDefaultTestProvider,
  NativeClarityBinProvider,
} from "lib-clarity-bin";
import {
  generateFilesForContract,
  submitAnalisysForContract,
} from "lib-generate";
import { getClarinetAccounts } from "lib-infra";
import {
  contractWithSubDirectory,
  contractWithSubDirectoryRelativeFilePath,
  getContractNameFromPath,
  getRootDirectory,
  getRootRelativeContractsFolder,
  Logger,
  toCamelCase,
  toPascalCase,
} from "lib-shared";
import { normalize, resolve } from "path";

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
  name: string;
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
        contractRelativeFilePath: contractWithSubDirectoryRelativeFilePath(
          contract,
          group.subFolder
        ),
        contractFile: contractWithSubDirectory(contract, group.subFolder),
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
        contractRelativeFilePath: contractWithSubDirectoryRelativeFilePath(
          contract,
          group.subFolder
        ),
        contractFile: contractWithSubDirectory(contract, group.subFolder),
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
        contractRelativeFilePath: contractWithSubDirectoryRelativeFilePath(
          contract,
          group.subFolder
        ),
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
    const nodeContractMap: string[] = [];
    const webContractMap: string[] = [];

    const groupName = group.name;

    for (let contract of group.contracts) {
      const contractName = getContractNameFromPath(contract);

      const nodeContractVar = `node${toPascalCase(contractName)}`;
      const webContractVar = `web${toPascalCase(contractName)}`;

      const nodeContractInfo = `${nodeContractVar}Info`;
      const webContractInfo = `${webContractVar}Info`;

      const contractInterface = `${toCamelCase(contractName, true)}Contract`;
      const importPath = `'./${contractName}'`;
      const _import = `import { ${nodeContractInfo}, ${webContractInfo} } from ${importPath};`;
      imports.push(_import);

      const _export = `export type { ${contractInterface} } from ${importPath};`;
      exports.push(_export);

      nodeContractMap.push(`${nodeContractVar}: ${nodeContractInfo},`);
      webContractMap.push(`${webContractVar}: ${webContractInfo},`);
    }

    const webContractsName = `web${toPascalCase(groupName)}Contracts`;
    const nodeContractsName = `node${toPascalCase(groupName)}Contracts`;

    const file = `${imports.join("\n")}
    ${exports.join("\n")}
    
    export const ${nodeContractsName} = {
      ${nodeContractMap.join("\n  ")}
    };

    export const ${webContractsName} = {
      ${webContractMap.join("\n  ")}
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
        name: configuration.name,
        contracts: configuration.contracts,
        subFolder: configuration.subfolder,
      };
    }
  );

  return contractGroups;
}

async function generate(regenerateMockContracts: boolean) {
  const root = `${getRootDirectory()}/packages/clarity`;
  const contracts = await getClarinetAccounts(root);

  const projectPath = resolve(
    normalize(`${getRootRelativeContractsFolder()}/contracts.json`)
  ).replace(/\\/g, "/");

  const testProjectPath = resolve(
    normalize(`${getRootRelativeContractsFolder()}/test-contracts.json`)
  ).replace(/\\/g, "/");

  const project: IProject = getProject(projectPath);
  const testProject: IProject = getProject(testProjectPath);

  const projectOutputDirectory = `${getRootDirectory()}/${
    project.outputDirectory
  }`;
  const testProjectOutputDirectory = `${getRootDirectory()}/${
    testProject.outputDirectory
  }`;

  Logger.debug(
    "Contracts generate tool",
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
      testProjectOutputDirectory
    );

    await generateProjectIndexFile(
      testContractGroups,
      testProjectOutputDirectory
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
    projectOutputDirectory
  );

  await generateProjectIndexFile(contractGroups, projectOutputDirectory);
}

generate(true);
