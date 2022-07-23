import { revokeSource } from "lib-oracle";
import { ORACLE_HELPER } from "../utils/contract-helper";

export async function revokeSourceCommand() {
    const contract = await ORACLE_HELPER.buildOracleContract();

    await revokeSource({
        contract,
        source: "test1",
    });
}
