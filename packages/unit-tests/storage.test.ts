import { txOk } from "lib-shared";
import { clarinetAccounts, taralStorage } from "./jest-setup";

test("[File storage] - Can list file", async () => {
  const deployer = clarinetAccounts.deployer;
  const bob = clarinetAccounts["wallet_1"];

  const onChainStorage = taralStorage(deployer);

  const initialFiles = await onChainStorage.filesCount();

  expect(initialFiles).toEqual(0n);

  let filesForMember = await onChainStorage.getFilesByMember(deployer.address);

  expect(filesForMember["file-ids"]).toHaveLength(1);
  expect(filesForMember["file-ids"][0]).toEqual(0n);

  const result = await txOk(
    onChainStorage.registerFile(
      "Purchase Order #3.odt",
      "b9fc7a0998b8a755cacc1f67bf0818bf",
      [
        {
          "can-read": true,
          "can-write": true,
          address: deployer.address,
        },
      ]
    )
  );

  console.log("Result ", result);

  expect(result).toEqual(true);

  filesForMember = await onChainStorage.getFilesByMember(deployer.address);
  expect(filesForMember["file-ids"]).toHaveLength(2);
  expect(filesForMember["file-ids"][1]).toEqual(1n);
});
