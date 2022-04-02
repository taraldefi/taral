import * as stacks_transactions from "@stacks/transactions";
import * as bip39 from "bip39";
import * as c32c from "c32check";
import * as crypto from "crypto";
import * as wif from "wif";
import { bip32 } from "../utils/bip32";
import { ECPair } from "../utils/ecpair";

const { mnemonicToSeed } = bip39;
const { getAddressFromPrivateKey, TransactionVersion } = stacks_transactions;

const networkDerivationPath = "m/44'/5757'/0'/0/0";

export function privateKeyToWIF(
  private_key_hex:
    | WithImplicitCoercion<string>
    | { [Symbol.toPrimitive](hint: "string"): string },
  mainnet: boolean
): string {
  return wif.encode(
    mainnet ? 0x80 : 0xef,
    Buffer.from(private_key_hex, "hex"),
    true
  );
}

export function ecPairToHexString(secretKey: any): any {
  const ecPointHex = secretKey.privateKey.toString("hex");
  if (secretKey.compressed) {
    return `${ecPointHex}01`;
  } else {
    return ecPointHex;
  }
}

function deriveStxAddressChain() {
  return (rootNode: { derivePath: (arg0: any) => any }) => {
    const childKey = rootNode.derivePath(networkDerivationPath);
    if (!childKey.privateKey) {
      throw new Error(
        "Unable to derive private key from `rootNode`, bip32 master keychain"
      );
    }
    const txVersion = TransactionVersion.Testnet;
    const ecPair = ECPair.fromPrivateKey(childKey.privateKey);
    const privateKey = ecPairToHexString(ecPair);
    return {
      childKey,
      address: getAddressFromPrivateKey(privateKey, txVersion),
      publicKey: ecPair.publicKey,
      privateKey,
      ecPair,
    };
  };
}

export function sha256(data: crypto.BinaryLike): Buffer {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest();
}

export function ripemd160(data: Buffer | crypto.BinaryLike): Buffer {
  const hash = crypto.createHash("ripemd160");
  hash.update(data);
  return hash.digest();
}

export function hash160(data: crypto.BinaryLike): Buffer {
  return ripemd160(sha256(data));
}

export async function generateKeys(seed_phrase: string): Promise<{
  phrase: string;
  private: any;
  public: string;
  public_uncompressed: string;
  stacks: string;
  stacking: string;
  btc: string;
  wif: string;
}> {
  const seedBuffer = await mnemonicToSeed(seed_phrase);

  const masterKeychain = bip32.fromSeed(seedBuffer);
  const keys = deriveStxAddressChain()(masterKeychain);

  const uncompressed_hex = ECPair.fromPublicKey(keys.publicKey, {
    compressed: false,
  }).publicKey.toString("hex");

  return {
    phrase: seed_phrase,
    private: keys.privateKey,
    public: keys.publicKey.toString("hex"),
    public_uncompressed: uncompressed_hex,
    stacks: keys.address,
    stacking: `{ hashbytes: 0x${
      c32c.c32addressDecode(keys.address)[1]
    }, version: 0x00 }`,
    btc: c32c.c32ToB58(keys.address),
    wif: privateKeyToWIF(keys.privateKey, false),
  };
}
