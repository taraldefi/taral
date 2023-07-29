import {
  AddressHashMode,
  BufferCV,
  bufferCV,
  TupleCV,
  tupleCV,
} from "@stacks/transactions";
import { address } from "bitcoinjs-lib";
import BN from "bn.js";
import * as c32 from "c32check";

export function getAddressHashMode(btcAddress: string) {
  if (btcAddress.startsWith("bc1") || btcAddress.startsWith("tb1")) {
    const { data } = address.fromBech32(btcAddress);
    if (data.length === 32) {
      return AddressHashMode.SerializeP2WSH;
    } else {
      return AddressHashMode.SerializeP2WPKH;
    }
  } else {
    const { version } = address.fromBase58Check(btcAddress);
    switch (version) {
      case 0:
        return AddressHashMode.SerializeP2PKH;
      case 111:
        return AddressHashMode.SerializeP2PKH;
      case 5:
        return AddressHashMode.SerializeP2SH;
      case 196:
        return AddressHashMode.SerializeP2SH;
      default:
        throw new Error("Invalid pox address version");
    }
  }
}

export function addressHashModeToBtcVersion(hashMode: number, mainnet = true) {
  switch (hashMode) {
    case AddressHashMode.SerializeP2PKH:
      return mainnet ? 0 : 111;
    case AddressHashMode.SerializeP2SH:
      return mainnet ? 5 : 196;
    default:
      throw new Error("Invalid hash mode");
  }
}

export function decodeBtcAddress(btcAddress: string) {
  const hashMode = getAddressHashMode(btcAddress);
  if (btcAddress.startsWith("bc1") || btcAddress.startsWith("tb1")) {
    const { data } = address.fromBech32(btcAddress);
    return {
      hashMode,
      data,
    };
  } else {
    const { hash } = address.fromBase58Check(btcAddress);
    return {
      hashMode,
      data: hash,
    };
  }
}

export function decodeStxAddress(stxAddress: string) {
  const btcAddress = c32.c32ToB58(stxAddress);
  return decodeBtcAddress(btcAddress);
}

export function poxAddrCVFromBitcoin(btcAddress: string) {
  const { hashMode, data } = decodeBtcAddress(btcAddress);
  return tupleCV({
    hashbytes: bufferCV(data),
    version: bufferCV(Buffer.from([hashMode])),
  });
}

export function poxAddrCV(stxAddress: string) {
  const { hashMode, data } = decodeStxAddress(stxAddress);
  return tupleCV({
    hashbytes: bufferCV(data),
    version: bufferCV(new BN(hashMode, 10).toBuffer()),
  });
}

export function poxCVToBtcAddress(poxAddrCV: TupleCV) {
  return address.toBase58Check(
    (poxAddrCV.data.hashbytes as BufferCV).buffer,
    addressHashModeToBtcVersion(
      (poxAddrCV.data.version as BufferCV).buffer.valueOf()[0]
    )
  );
}
