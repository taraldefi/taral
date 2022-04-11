import { getDeployerPublicKey } from "./testbeds/public-key-testbed";
const NAME = "Testbed";

async function main() {
  const cwd = `${process.cwd()}`;
  console.log("Taral testbed");
  console.log("A place to quickly prototype and test things.");
  console.log(`Ran from ${cwd}`);
  await getDeployerPublicKey();
}

main();
