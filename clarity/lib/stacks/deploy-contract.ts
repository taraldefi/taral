import {
    makeContractDeploy,
} from "@stacks/transactions";
import { StacksNetworkConfiguration } from "../../configuration";
import * as fs from "fs";
import { handleTransaction } from "./handle-transaction";
import { Logger } from "..";

export async function deployContractOnStacks(
    contractName: string,
    contractPath: string,
    network: StacksNetworkConfiguration,
    secretDeployKey: string
) {
    Logger.debug(`preparing to deploy contract ${contractName}`);

    let codeBody = fs.readFileSync(contractPath).toString();

    var transaction = await makeContractDeploy({
        contractName,
        codeBody,
        senderKey: secretDeployKey,
        network,
        anchorMode: 3,
    });

    Logger.debug(`deploy contract ${contractName}`);
    
    return handleTransaction(transaction, network);
}