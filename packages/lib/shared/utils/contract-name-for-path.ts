export const getContractNameFromPath = (path: string) => {
  const contractPaths = path.normalize().split("/");
  const filename = contractPaths[contractPaths.length - 1];
  const [contractName] = filename.split(".");
  return contractName;
};
