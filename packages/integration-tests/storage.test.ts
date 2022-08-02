import {
  canRead,
  canWrite,
  grantAccessToFile,
  IStorageFileRegister,
  IStorageFileUpdate,
  registerFile,
  revokeAccessFromFile,
  updateAccessToFile,
  updateFile,
} from "lib-storage";
import { uuid } from "lib-shared";
import { clarinetAccounts, taralStorage } from "./jest-setup";
import { PrivateKey, readTestFile, StorageApiClient } from "./storage";

test("[File storage] - Happy flow", async () => {

  const storage: StorageApiClient = new StorageApiClient("http://localhost:3000", PrivateKey);

  const fileInfo = readTestFile();

  const result = await storage.createFile(fileInfo.file, fileInfo.fileSizeInBytes);

  expect(result.hasError).toBe(false);

  const id = result.result?.id!;

  const deployer = clarinetAccounts.deployer;

  const bob = clarinetAccounts["wallet_1"];

  const onChainStorage = taralStorage(deployer);
  const deployerPrivateKey = clarinetAccounts.deployer.privateKey;

  const firstFileBuffer = readTestFile(firstVersionFileName);

  const registerFilePayload: IStorageFileRegister = {
    fileId: id,
    fileBuffer: firstFileBuffer,
    fileName: firstVersionFileName,
    privateKey: deployerPrivateKey,
    contract: onChainStorage,
  };

  const registerFileResult = await registerFile(registerFilePayload);

  expect(registerFileResult).toEqual(id);

  const canWriteFile = await canWrite({
    contract: onChainStorage,
    fileId: id,
    participant: deployer.address,
  });

  const canReadFile = await canRead({
    contract: onChainStorage,
    fileId: id,
    participant: deployer.address,
  });

  expect(canWriteFile).toBeTruthy();
  expect(canReadFile).toBeTruthy();

  let canBobWriteFile = await canWrite({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  let canBobReadFile = await canRead({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  expect(canBobWriteFile).toBeFalsy();
  expect(canBobReadFile).toBeFalsy();

  const grantAccessToBobResult = await grantAccessToFile({
    canRead: true,
    canWrite: false,
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  expect(grantAccessToBobResult).toBeTruthy();

  canBobWriteFile = await canWrite({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  canBobReadFile = await canRead({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  expect(canBobWriteFile).toBeFalsy();
  expect(canBobReadFile).toBeTruthy();

  const updateAccessResult = await updateAccessToFile({
    canRead: true,
    canWrite: true,
    contract: onChainStorage,
    participant: bob.address,
    fileId: id,
  });

  expect(updateAccessResult).toBeTruthy();

  const bobsNewWritePermissions = await canWrite({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  const bobsNewReadPermissions = await canRead({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  expect(bobsNewWritePermissions).toBeTruthy();
  expect(bobsNewReadPermissions).toBeTruthy();

  const secondFileBuffer = readTestFile(secondVersionFileName);

  const updateFilePayload: IStorageFileUpdate = {
    fileBuffer: secondFileBuffer,
    fileId: id,
    privateKey: deployerPrivateKey,
    contract: onChainStorage,
  };

  const updateFileResult = await updateFile(updateFilePayload);

  expect(updateFileResult).toEqual(true);

  const revokeAccessResult = await revokeAccessFromFile({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  expect(revokeAccessResult).toEqual(true);

  const bobsRevokeAccessWritePermissions = await canWrite({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  const bobsRevokeAccessReadPermissions = await canRead({
    contract: onChainStorage,
    fileId: id,
    participant: bob.address,
  });

  expect(bobsRevokeAccessWritePermissions).toBeFalsy();
  expect(bobsRevokeAccessReadPermissions).toBeFalsy();
}, 3000000);
