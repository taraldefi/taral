import { TestProvider } from "lib-testing";
import { nodeTaralContracts } from "taral-contracts";
import { clarinetAccounts, clarityBin } from "./jest-setup";

test("Test that we can access the token without deploying", async () => {
  const taralExporterInfo = nodeTaralContracts.nodeTaralExporterV1;
  const contractInfo = await TestProvider.fromContracts(
    false,
    {
      taralExporterInfo,
    },
    clarityBin
  );

  const contract = contractInfo.taralExporterInfo.contract;

  const taral_exporter = contract(clarinetAccounts.deployer);

  const result = await taral_exporter.getVersion();

  console.log("result: -------->", result);
}, 3000000);
