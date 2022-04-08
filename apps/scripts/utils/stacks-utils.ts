import { c32addressDecode, c32address } from "c32check";
import RIPEMD160 from "ripemd160-min";
import { sha256, sha512 } from "sha.js";

import { ec as EC } from "elliptic";

export interface StacksPrivateKey {
  data: Buffer;
  compressed: boolean;
}

export function createStacksPrivateKey(key: string | Buffer): StacksPrivateKey {
  const data = typeof key === "string" ? Buffer.from(key, "hex") : key;
  let compressed: boolean;
  if (data.length === 33) {
    if (data[data.length - 1] !== 1) {
      throw new Error(
        "Improperly formatted private-key. 33 byte length usually " +
          "indicates compressed key, but last byte must be == 0x01"
      );
    }
    compressed = true;
  } else if (data.length === 32) {
    compressed = false;
  } else {
    throw new Error(
      `Improperly formatted private-key hex string: length should be 32 or 33 bytes, provided with length ${data.length}`
    );
  }
  return { data, compressed };
}

enum StacksMessageType {
  Address,
  Principal,
  LengthPrefixedString,
  MemoString,
  AssetInfo,
  PostCondition,
  PublicKey,
  LengthPrefixedList,
  Payload,
  MessageSignature,
  TransactionAuthField,
}

enum TransactionVersion {
  Mainnet = 0x00,
  Testnet = 0x80,
}

enum AddressVersion {
  MainnetSingleSig = 22,
  MainnetMultiSig = 20,
  TestnetSingleSig = 26,
  TestnetMultiSig = 21,
}

enum AddressHashMode {
  // serialization modes for public keys to addresses.
  // We support four different modes due to legacy compatibility with Stacks v1 addresses:
  /** SingleSigHashMode - hash160(public-key), same as bitcoin's p2pkh */
  SerializeP2PKH = 0x00,
  /** MultiSigHashMode - hash160(multisig-redeem-script), same as bitcoin's multisig p2sh */
  SerializeP2SH = 0x01,
  /** SingleSigHashMode - hash160(segwit-program-00(p2pkh)), same as bitcoin's p2sh-p2wpkh */
  SerializeP2WPKH = 0x02,
  /** MultiSigHashMode - hash160(segwit-program-00(public-keys)), same as bitcoin's p2sh-p2wsh */
  SerializeP2WSH = 0x03,
}

export function addressHashModeToVersion(
  hashMode: AddressHashMode,
  txVersion: TransactionVersion
): AddressVersion {
  switch (hashMode) {
    case AddressHashMode.SerializeP2PKH:
      switch (txVersion) {
        case TransactionVersion.Mainnet:
          return AddressVersion.MainnetSingleSig;
        case TransactionVersion.Testnet:
          return AddressVersion.TestnetSingleSig;
        default:
          throw new Error(
            `Unexpected txVersion ${JSON.stringify(
              txVersion
            )} for hashMode ${hashMode}`
          );
      }
    case AddressHashMode.SerializeP2SH:
    case AddressHashMode.SerializeP2WPKH:
    case AddressHashMode.SerializeP2WSH:
      switch (txVersion) {
        case TransactionVersion.Mainnet:
          return AddressVersion.MainnetMultiSig;
        case TransactionVersion.Testnet:
          return AddressVersion.TestnetMultiSig;
        default:
          throw new Error(
            `Unexpected txVersion ${JSON.stringify(
              txVersion
            )} for hashMode ${hashMode}`
          );
      }
    default:
      throw new Error(`Unexpected hashMode ${JSON.stringify(hashMode)}`);
  }
}

export interface Address {
  readonly type: StacksMessageType.Address;
  readonly version: AddressVersion;
  readonly hash160: string;
}

export function addressFromVersionHash(
  version: AddressVersion,
  hash: string
): Address {
  return { type: StacksMessageType.Address, version, hash160: hash };
}

export function addressToString(address: Address): string {
  return c32address(address.version, address.hash160).toString();
}

// Internally, the Stacks blockchain encodes address the same as Bitcoin
// single-sig address (p2pkh)
export const hashP2PKH = (input: Buffer): string => {
  return hash160(input).toString("hex");
};

export const hash160 = (input: Buffer): Buffer => {
  const sha256Result = new sha256().update(input).digest();
  return Buffer.from(new RIPEMD160().update(sha256Result).digest());
};

export function getAddressFromPublicKey(
  /** Public key buffer or hex string */
  publicKey: string | Buffer,
  transactionVersion = TransactionVersion.Mainnet
): string {
  publicKey =
    typeof publicKey === "string" ? publicKey : publicKey.toString("hex");
  const addrVer = addressHashModeToVersion(
    AddressHashMode.SerializeP2PKH,
    transactionVersion
  );
  const addr = addressFromVersionHash(
    addrVer,
    hashP2PKH(Buffer.from(publicKey, "hex"))
  );
  const addrString = addressToString(addr);
  return addrString;
}

export function getAddressFromPrivateKey(
  /** Private key buffer or hex string */
  privateKey: string | Buffer,
  transactionVersion = TransactionVersion.Mainnet
): string {
  const pubKey = pubKeyfromPrivKey(privateKey);
  return getAddressFromPublicKey(pubKey.data, transactionVersion);
}

export interface StacksPublicKey {
  readonly type: StacksMessageType.PublicKey;
  readonly data: Buffer;
}

export function createStacksPublicKey(key: string): StacksPublicKey {
  return {
    type: StacksMessageType.PublicKey,
    data: Buffer.from(key, "hex"),
  };
}

export function pubKeyfromPrivKey(
  privateKey: string | Buffer
): StacksPublicKey {
  const privKey = createStacksPrivateKey(privateKey);
  const ec = new EC("secp256k1");
  const keyPair = ec.keyFromPrivate(
    privKey.data.toString("hex").slice(0, 64),
    "hex"
  );
  const pubKey = keyPair.getPublic(privKey.compressed, "hex");
  return createStacksPublicKey(pubKey);
}
