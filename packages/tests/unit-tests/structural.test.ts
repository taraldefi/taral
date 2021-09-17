import { clarinetAccounts } from "../integration-tests/jest-setup";
import { talToken } from "./jest-setup";

test("Should be named TARAL", async () => {
    const token = talToken(clarinetAccounts.deployer);
    const result = (await token.getName())._unsafeUnwrap();
    expect(result).toBe("TARAL");
});

test("Ticker should be TAL", async () => {
    const token = talToken(clarinetAccounts.deployer);
    const result = (await token.getSymbol())._unsafeUnwrap();
    expect(result).toBe("TAL");
});

test("Decimals should be 6", async () => {
    const token = talToken(clarinetAccounts.deployer);
    const result = (await token.getDecimals())._unsafeUnwrap();
    expect(result).toEqual(6n);
});
