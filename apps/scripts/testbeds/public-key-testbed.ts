import { getClarinetAccounts } from "lib-infra";
import { getRootDirectory, Logger } from "lib-shared";
import {
  getAddressFromPublicKey,
  publicKeyFromPrivKey,
  TransactionVersion,
} from "lib-stacks";

const LOGGER_CATEGORY = "DERIVE_PUBLIC_KEY";

export async function getDeployerPublicKey() {
  const root = `${getRootDirectory()}/packages/clarity`;

  const contracts = await getClarinetAccounts(root);

  const deployerPrivateKey = contracts.deployer.privateKey;

  Logger.info(
    LOGGER_CATEGORY,
    `Attempting to generate public key for ${contracts.deployer.address} on TESTNET`,
  );

  Logger.info(
    LOGGER_CATEGORY,
    `The private key for ${contracts.deployer.address} on TESTNET is ${deployerPrivateKey}`,
  );

  const publicKey = publicKeyFromPrivKey(deployerPrivateKey);

  Logger.info(
    LOGGER_CATEGORY,
    `Derived public key: ${publicKey.data.toString("hex")}`,
  );

  const address = getAddressFromPublicKey(
    publicKey.data,
    TransactionVersion.Testnet,
  );

  Logger.info(
    LOGGER_CATEGORY,
    `Stacks address composed from public key is ${address} on TESTNET`,
  );

  Logger.info(
    LOGGER_CATEGORY,
    `Checking initial address with the address generated back from the public key. Equality: ${
      address === contracts.deployer.address
    }`,
  );
}
