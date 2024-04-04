import {
  makeContractCall,
  uintCV,
  principalCV,
  broadcastTransaction,
  PostConditionMode,
  AnchorMode,
} from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";

async function mintTokens() {
  const network = new StacksTestnet();
  const secretKey = ""; // Replace with your secret key
  const contractAddress =
    "STRP7MYBHSMFH5EGN3HGX6KNQ7QBHVTBPF1669DW.susdt-token-v2"; // Replace with the contract address

  const transaction = await makeContractCall({
    contractAddress: contractAddress.split(".")[0],
    contractName: contractAddress.split(".")[1], // Replace with your contract name
    functionName: "mint", // Replace with your minting function name
    functionArgs: [
      uintCV(100000000000000),
      principalCV("STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6"),
    ], // Add arguments if required
    senderKey: secretKey,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    network,
  });

  return transaction;
}

mintTokens()
  .then(async (transaction) => {
    const network = new StacksTestnet();
    const broadcastResponse = await broadcastTransaction(transaction, network);
    const txId = broadcastResponse.txid;
    console.log("Transaction:", txId);
  })
  .catch((error) => {
    console.error("Error minting tokens:", error);
  });
