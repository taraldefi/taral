import { readFileSync } from "fs";
import { getRootDirectory } from "lib-shared";
import { clarinetAccounts, taralStorage } from "./jest-setup";
import {
  registerFile,
  IStorageFileRegister,
  canWrite,
  canRead,
} from "lib-storage";

test("[File storage] - API", async () => {
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

  const canWriteFile = await canWrite({
    contract: onChainStorage,
    fileId: 1n,
    participant: deployer.address,
  });

  const canReadFile = await canRead({
    contract: onChainStorage,
    fileId: 1n,
    participant: deployer.address,
  });

  expect(canWriteFile).toBeTruthy();
  expect(canReadFile).toBeTruthy();
});
