import {
  makeContractCall,
  uintCV,
  principalCV,
  broadcastTransaction,
  bufferCV,
} from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";

async function mintTokens() {
  const network = new StacksTestnet();
  const secretKey = ""; // Replace with your secret key
  const contractAddress =
    "STRP7MYBHSMFH5EGN3HGX6KNQ7QBHVTBPF1669DW.susdt-token-v2"; // Replace with the contract address

  const transaction = await makeContractCall({
    //feeEstimateApiUrl: "https://api.testnet.hiro.so/v2/fees/transfer",
    contractAddress: contractAddress.split(".")[0],
    contractName: contractAddress.split(".")[1], // Replace with your contract name
    functionName: "transfer", // Replace with your minting function name
    functionArgs: [
      uintCV(1000000000),
      principalCV("ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ"),
      principalCV("ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP"),
      bufferCV(Buffer.from("memo tx")),
    ], // Add arguments if required
    senderKey: secretKey,
    anchorMode: 1,
    postConditionMode: 1,
    network,
    fee: 1,
  });
  //   const transaction = await makeContractCall({
  //     contractAddress: contractAddress.split(".")[0],
  //     contractName: contractAddress.split(".")[1], // Replace with your contract name
  //     functionName: "mint", // Replace with your minting function name
  //     functionArgs: [
  //       uintCV(1000000000),
  //       principalCV("ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ"),
  //     ], // Add arguments if required
  //     senderKey: secretKey,
  //     anchorMode: 1,
  //     postConditionMode: 1,
  //     network,
  //     fee: 1000000,
  //   });

  return transaction;
}

mintTokens()
  .then(async (transaction) => {
    const broadcastResponse = await broadcastTransaction(transaction);
    const txId = broadcastResponse.txid;
    console.log("Transaction ID:", txId);
  })
  .catch((error) => {
    console.error("Error minting tokens:", error);
  });
