import { AddressHashMode, AddressVersion, TransactionVersion } from "./types";

export function addressHashModeToVersion(
  hashMode: AddressHashMode,
  txVersion: TransactionVersion,
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
              txVersion,
            )} for hashMode ${hashMode}`,
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
              txVersion,
            )} for hashMode ${hashMode}`,
          );
      }
    default:
      throw new Error(`Unexpected hashMode ${JSON.stringify(hashMode)}`);
  }
}
