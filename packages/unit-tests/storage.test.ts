import { readFileSync } from "fs";
import { getRootDirectory } from "lib-shared";
import { clarinetAccounts, taralStorage } from "./jest-setup";
import { registerFile, IStorageFileRegister } from "lib-storage";

test("[File storage] - Can list file", async () => {
  const deployer = clarinetAccounts.deployer;

  const onChainStorage = taralStorage(deployer);
  const deployerPrivateKey = clarinetAccounts.deployer.privateKey;
  const filename = "file.txt";
  const filePath = `${getRootDirectory()}/packages/unit-tests/${filename}`;
  const fileBuffer = readFileSync(filePath);
  const registerFilePayload: IStorageFileRegister = {
    fileBuffer: fileBuffer,
    fileName: filename,
    privateKey: deployerPrivateKey,
    contract: onChainStorage,
  };

  const registerFileResult = await registerFile(registerFilePayload);

  expect(registerFileResult).toEqual(1n);
});
