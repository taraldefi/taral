import { clarinetAccounts, taralOracle } from "./jest-setup";
import { ClarinetAccount, txErr, txOk } from "lib-shared";

const UnauthorizedAddress: string = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG";
const UnauthorizedClarinetAccount: ClarinetAccount = {
  address: UnauthorizedAddress,
  mnemonic: "",
  privateKey: "",
  balance: BigInt(0),
};

test("Can set price", async () => {
  const token = taralOracle(clarinetAccounts.deployer);
  const result = await txOk(
    token.setOracleOwner(clarinetAccounts.deployer.address)
  );
  expect(result.value).toBe(true);
}, 3000000);

test("Cannot set price", async () => {
  const token = taralOracle(UnauthorizedClarinetAccount);
  const result = await txErr(token.setOracleOwner(UnauthorizedAddress));
  expect(result.value).toBe(8401n);
}, 3000000);

test("Can update price", async () => {
  const token = taralOracle(clarinetAccounts.deployer);
  const result = await txOk(
    token.setOracleOwner(clarinetAccounts.deployer.address)
  );
  expect(result.value).toBe(true);
  const priceUpdateResult = await txOk(token.updatePrice("STX", 2n, 2));
  expect(priceUpdateResult.value).toBe(2n);
  var getPriceResult = await token.getPrice("STX");
  expect(getPriceResult["last-price"]).toBe(2n);
}, 3000000);

test("Cannot update price", async () => {
  const token = taralOracle(UnauthorizedClarinetAccount);
  const priceUpdateResult = await txErr(token.updatePrice("STX", 2n, 2));
  expect(priceUpdateResult.value).toBe(851n);
}, 3000000);
