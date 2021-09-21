import {
  ClarinetAccount,
  ClarinetAccounts,
  getClarinetAccounts,
  getRootDirectory,
} from "taral-shared";

export let clarinetAccounts: ClarinetAccounts;
export let deployer: ClarinetAccount;

beforeAll(async () => {
  jest.setTimeout(3000000);
  const root = `${getRootDirectory()}/packages/clarity`;
  clarinetAccounts = await getClarinetAccounts(root);
  deployer = clarinetAccounts.deployer;
});
