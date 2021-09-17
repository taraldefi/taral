import {
  ClarinetAccount,
  ClarinetAccounts,
  getClarinetAccounts,
} from "../../lib";

export let clarinetAccounts: ClarinetAccounts;
export let deployer: ClarinetAccount;

beforeAll(async () => {
  jest.setTimeout(3000000);
  const cwd = `${process.cwd()}/clarity/`;
  clarinetAccounts = await getClarinetAccounts(cwd);
  deployer = clarinetAccounts.deployer;
});
