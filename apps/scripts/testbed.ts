import { storageManualTest } from "./testbeds/storage";
import { storageMvp } from "./testbeds/storage-mvp";

async function main() {
  const cwd = `${process.cwd()}`;
  console.log("Taral testbed");
  console.log("A place to quickly prototype and test things.");
  console.log(`Ran from ${cwd}`);
  // await getDeployerPublicKey();

  // await storageManualTest();
  await storageMvp();
}

main();
