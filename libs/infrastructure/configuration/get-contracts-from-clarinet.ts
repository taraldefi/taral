import { ClarinetAccounts } from "lib-shared";
import { ConfigContract, getClarinetConfig } from ".";

export function getContractsFromClarinet(
    folder: string,
    accounts: ClarinetAccounts
): ConfigContract[] {
    const clarinetConfig = getClarinetConfig(folder);
    const deployerAddress = accounts.deployer.address;
    const contracts: ConfigContract[] = Object.entries(
        clarinetConfig.contracts
    ).map(([_contractName, info]) => {
        const file = info.path.replace(/^contracts\//, "");
        return {
            file,
            address: deployerAddress,
        };
    });
    return contracts;
}
