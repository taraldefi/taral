import { StacksNetworkConfiguration } from "../../configuration";

export async function timeout(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTransactionById(
    network: StacksNetworkConfiguration,
    txId: string
): Promise<any> {
    const url = `${network.coreApiUrl}/extended/v1/tx/${txId}`;
    var result = await fetch(url);
    var value = await result.json();

    return value;
}