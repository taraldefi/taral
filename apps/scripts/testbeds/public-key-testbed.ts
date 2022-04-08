import { getClarinetAccounts } from "lib-infra";
import { getRootDirectory, Logger } from "lib-shared";
import {
  pubKeyfromPrivKey,
  getAddressFromPublicKey,
} from "../utils/stacks-utils";

export async function getDeployerPublicKey() {
  // const privateKey = wallet.accounts[0].stxPrivateKey;
  // const [account] = wallet.accounts;
  // const address = getStxAddress({ account });

  // console.log('private key: ', privateKey);
  // console.log('wallet: ', wallet);
  // console.log('address : ', address);

  // const publicKey = getPublicKeyFromPrivate(privateKey);
  // const privateKey = makeECPrivateKey();
  // console.log(privateKey);
  // const publicKey = getPublicKeyFromPrivate('753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601');

  // console.log(publicKey);

  // console.log(publicKeyToAddress('0367b2946150dfab1862457da80beb522440be5737ea51ba14cf8018a12911128f'))

  const root = `${getRootDirectory()}/packages/clarity`;

  const contracts = await getClarinetAccounts(root);

  const deployerPrivateKey = contracts.deployer.privateKey;

  const publicKey = pubKeyfromPrivKey(deployerPrivateKey);

  console.log(publicKey);

  console.log(publicKey.data.toString("hex"));

  const address = getAddressFromPublicKey(publicKey.data);

  console.log(address);
}
