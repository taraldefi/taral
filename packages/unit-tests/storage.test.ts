import {
  canRead,
  canWrite,
  getFileHash,
  grantAccessToFile,
  IStorageFileRegister,
  IStorageFileUpdate,
  registerFile,
  revokeAccessFromFile,
  updateAccessToFile,
  updateFile,
} from "lib-storage";
import { clarinetAccounts, taralStorage } from "./jest-setup";
import { readTestFile } from "./test-utils";
import { v4 as uuidv4 } from 'uuid';

test("[File storage] - Happy flow", async () => {

  const id: string = uuidv4()

  const firstFileHash =
    "0x65326430666531353835613633656336303039633830313666663864646138623137373139613633373430356134653233633066663831333339313438323439";

  const secondFileHash =
    "0x39373839393763306535616630353865633736393535333062643163313633393430656461333935393734633939356165373665386463313131343638363235";

  const firstVersionFileName = "file-first-version.txt";
  const secondVersionFileName = "file-second-version.txt";

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

  const onChainHash = await getFileHash(id, onChainStorage);

  expect(onChainHash).toEqual(firstFileHash);

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

  const newOnChainHash = await getFileHash(id, onChainStorage);
  expect(newOnChainHash).toEqual(secondFileHash);

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
});
