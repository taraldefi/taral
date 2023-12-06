import { storageManualTest } from "./testbeds/storage";
import { getDeployerPublicKey } from "./testbeds/public-key-testbed";

async function main() {
  const cwd = `${process.cwd()}`;
  console.log("Taral testbed");
  console.log("A place to quickly prototype and test things.");
  console.log(`Ran from ${cwd}`);
  await getDeployerPublicKey();
  // await storageManualTest(true);
  // await storageMvp();
}

main();
