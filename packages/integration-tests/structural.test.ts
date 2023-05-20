import { txOk } from "lib-shared";
import { clarinetAccounts, talToken } from "./jest-setup";

test("Should have the correct token uri", async () => {
    const result = await txOk(talToken(clarinetAccounts.deployer).getTokenUri());

    expect(result.value).toBe("https://taraldefi.github.io");
}, 3000000);

test("Ticker should be TAL", async () => {
    const result = (
        await talToken(clarinetAccounts.deployer).getSymbol()
    )._unsafeUnwrap();
    expect(result).toBe("TAL");
}, 3000000);

test("Decimals should be 6", async () => {
    const result = (
        await talToken(clarinetAccounts.deployer).getDecimals()
    )._unsafeUnwrap();
    expect(result).toEqual(6n);
}, 3000000);
