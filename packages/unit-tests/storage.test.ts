import { readFileSync } from "fs";
import { getRootDirectory } from "lib-shared";
import { clarinetAccounts, taralStorage } from "./jest-setup";
import {
  registerFile,
  IStorageFileRegister,
  canWrite,
  canRead,
  getFileHash,
} from "lib-storage";

test("[File storage] - Happy flow", async () => {
  const firstFileHash =
    "0x65326430666531353835613633656336303039633830313666663864646138623137373139613633373430356134653233633066663831333339313438323439";

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

  const onChainHash = await getFileHash(1n, onChainStorage);

  expect(onChainHash).toEqual(firstFileHash);

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
