import { addSource } from "lib-oracle";
import { getOracleContract } from "../utils/contracts";

export async function addSourceCommand() {
  const oracleContractInfo = await getOracleContract();
  const oracleContract = oracleContractInfo.contract;
  const account = oracleContractInfo.account;

  const contract = oracleContract.contract(account);

  await addSource({
    contract: contract,
    source: "test1",
    publicKey: Buffer.from(
      "0x032ac03dbc2d291023459f14b1f94324bd072baf5d3914a83d81edd655dcc2b2ed",
      "hex"
    ),
  });

  await addSource({
    source: "test2",
    contract: contract,
    publicKey: Buffer.from(
      "0x032ac03dbc2d291023459f14b1f94324bd072baf5d3914a83d81edd655dcc2b2ed",
      "hex"
    ),
  });
}
