import { addSource } from "lib-oracle";
import { ORACLE_HELPER } from "../utils/contract-helper";

export async function addSourceCommand() {
  const contract = await ORACLE_HELPER.buildOracleContract();

  await addSource({
    contract: contract,
    source: "test1",
    publicKey: Buffer.from(
      "0x032ac03dbc2d291023459f14b1f94324bd072baf5d3914a83d81edd655dcc2b2ed",
      "hex",
    ),
  });

  await addSource({
    source: "test2",
    contract: contract,
    publicKey: Buffer.from(
      "0x032ac03dbc2d291023459f14b1f94324bd072baf5d3914a83d81edd655dcc2b2ed",
      "hex",
    ),
  });
}
