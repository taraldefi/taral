import {
  btcAddressToStacksAddress,
  stacksAddressToBtcAddress,
  validateStacksAddress,
} from "../../lib";
import { deployer } from "./jest-setup";

test("Address should be valid", async () => {
  let stacksAddress = deployer.address;
  let isValid = validateStacksAddress(stacksAddress);
  expect(isValid).toBe(true);
});

test("Address should not be valid", async () => {
  let stacksAddress = deployer.address.replace("ST", "SM");
  let isValid = validateStacksAddress(stacksAddress);
  expect(isValid).toBe(false);
});

test("Can derive btc address from stacks address", async () => {
  let stacksAddress = deployer.address;
  let btcAddress = stacksAddressToBtcAddress(stacksAddress);
  expect(btcAddress).toBe("msbf5XektEjjiWHnAEMr2iXWWsBaJVb1RS");
});

test("Can derive btc address from stacks address", async () => {
  let stacksAddress = deployer.address;
  let stacksFromBtcAddress = btcAddressToStacksAddress(
    "msbf5XektEjjiWHnAEMr2iXWWsBaJVb1RS"
  );
  expect(stacksFromBtcAddress).toBe(stacksAddress);
});
