import { stacksAddressToBtcAddress, validateStacksAddress } from "lib-shared";
import { deployer } from "./jest-setup";

test("Address should be valid", () => {
    const stacksAddress = deployer.address;
    const isValid = validateStacksAddress(stacksAddress);
    expect(isValid).toBe(true);
});

test("Address should not be valid", () => {
    const stacksAddress = deployer.address.replace("ST", "SM");
    const isValid = validateStacksAddress(stacksAddress);
    expect(isValid).toBe(false);
});

test("Can derive btc address from stacks address", () => {
    const stacksAddress = deployer.address;
    const btcAddress = stacksAddressToBtcAddress(stacksAddress);
    expect(btcAddress).toBe("mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH");
});
