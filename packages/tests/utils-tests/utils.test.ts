import {
    stacksAddressToBtcAddress,
    validateStacksAddress
} from "taral-shared";
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
    expect(btcAddress).toBe("mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH");
});
