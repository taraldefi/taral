import { Logger, txOk } from "lib-shared";
import { TaralOracleV1Contract } from "taral-contracts";

export async function addSource({
    source,
    publicKey,
    contract
}: {
    source: string,
    publicKey: Buffer,
    contract: TaralOracleV1Contract
}): Promise<boolean> {
    
    let response = await txOk(
        contract.addSource(source, publicKey)
    );

    Logger.debug("add-source", "Received result ", response);

    return response.value;
}