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
import { clarinetAccounts, taralStorage } from "./jest-setup";
import { readTestFile } from "./storage";
import { StorageApiClient } from "lib-storage";
import { Logger } from "lib-shared";

test("[File storage] - Happy flow", async () => {
  const deployer = clarinetAccounts.deployer;
  const bob = clarinetAccounts["wallet_1"];

  const onChainStorage = taralStorage(deployer);

  const deployerPrivateKey = clarinetAccounts.deployer.privateKey;

  const firstVersionFileName = "dummy.pdf";
  const secondVersionFileName = "dummy-edited.pdf";

  const deployerConfiguredStorage: StorageApiClient = new StorageApiClient("http://localhost:3000", deployerPrivateKey);
  const bobsStorage: StorageApiClient = new StorageApiClient("http://localhost:3000", bob.privateKey);

  const firstFileBuffer = readTestFile(firstVersionFileName);

  const result = await deployerConfiguredStorage.createFile(firstVersionFileName, firstFileBuffer.file, firstFileBuffer.fileSizeInBytes);

  expect(result.hasError).toBe(false);

  Logger.debug("create-file", `Created file with id ${result.result?.id}`);

  const id = result.result?.id!;

  const registerFilePayload: IStorageFileRegister = {
    fileId: id,
    fileHash: result.result?.hash!,
    fileName: result.result?.name!,
    privateKey: deployerPrivateKey,
    contract: onChainStorage,
  };

  const registerFileResult = await registerFile(registerFilePayload);

  Logger.debug("register-file", "registered the file");

  expect(registerFileResult).toEqual(id);

  // const canWriteFile = await canWrite({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: deployer.address,
  // });

  // const canReadFile = await canRead({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: deployer.address,
  // });

  // expect(canWriteFile).toBeTruthy();
  // expect(canReadFile).toBeTruthy();

  // let canBobWriteFile = await canWrite({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // let canBobReadFile = await canRead({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // expect(canBobWriteFile).toBeFalsy();
  // expect(canBobReadFile).toBeFalsy();

  // // a request from bob to read the file will fail

  // const bobTriesToReadTheFileResult = await bobsStorage.requestFile(id);

  // console.log("bob tries to read ", JSON.stringify(bobTriesToReadTheFileResult));

  // expect(bobTriesToReadTheFileResult.hasError).toBeTruthy();
  // expect(bobTriesToReadTheFileResult.error?.errors.message).toEqual('no-rights-on-chain');

  // const grantAccessToBobResult = await grantAccessToFile({
  //   canRead: true,
  //   canWrite: false,
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // expect(grantAccessToBobResult).toBeTruthy();

  // canBobWriteFile = await canWrite({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // canBobReadFile = await canRead({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // expect(canBobWriteFile).toBeFalsy();
  // expect(canBobReadFile).toBeTruthy();

  // const updateAccessResult = await updateAccessToFile({
  //   canRead: true,
  //   canWrite: true,
  //   contract: onChainStorage,
  //   participant: bob.address,
  //   fileId: id,
  // });

  // expect(updateAccessResult).toBeTruthy();

  // const bobsNewWritePermissions = await canWrite({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // const bobsNewReadPermissions = await canRead({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // expect(bobsNewWritePermissions).toBeTruthy();
  // expect(bobsNewReadPermissions).toBeTruthy();

  // Logger.debug("testest" ,"ARRIVED HERE !!!!!");

  // const secondFileBuffer = readTestFile(secondVersionFileName);

  // const apiUpdateResult = await deployerConfiguredStorage.updateFile(id, secondFileBuffer.file, secondFileBuffer.fileSizeInBytes);

  // expect(apiUpdateResult.hasError).toBeFalsy();

  // const newHash = apiUpdateResult.result?.hash!;

  // const updateFilePayload: IStorageFileUpdate = {
  //   fileHash: newHash,
  //   fileId: id,
  //   privateKey: deployerPrivateKey,
  //   contract: onChainStorage,
  // };

  // const updateFileResult = await updateFile(updateFilePayload);

  // expect(updateFileResult).toEqual(true);

  // const revokeAccessResult = await revokeAccessFromFile({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // expect(revokeAccessResult).toEqual(true);

  // const bobsRevokeAccessWritePermissions = await canWrite({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // const bobsRevokeAccessReadPermissions = await canRead({
  //   contract: onChainStorage,
  //   fileId: id,
  //   participant: bob.address,
  // });

  // expect(bobsRevokeAccessWritePermissions).toBeFalsy();
  // expect(bobsRevokeAccessReadPermissions).toBeFalsy();

  // const bobTriesToReadTheFileResultAgain = await bobsStorage.requestFile(id);
  
  // expect(bobTriesToReadTheFileResultAgain.hasError).toBeTruthy();
  // expect(bobTriesToReadTheFileResultAgain.error?.errors.message).toEqual('no-rights-on-chain');
  
}, 6000000);
