import {
    makeContractDeploy,
} from "@stacks/transactions";
import { StacksNetworkConfiguration } from "../../configuration";
import * as fs from "fs";
import { handleTransaction } from "./handle-transaction";

export async function deployContractOnStacks(
    contractName: string,
    contractPath: string,
    network: StacksNetworkConfiguration,
    secretDeployKey: string
) {
    let codeBody = fs.readFileSync(contractPath).toString();

    var transaction = await makeContractDeploy({
        contractName,
        codeBody,
        senderKey: secretDeployKey,
        network,
        anchorMode: 3,
    });

    return handleTransaction(transaction, network);
}