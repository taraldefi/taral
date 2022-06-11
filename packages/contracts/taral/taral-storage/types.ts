import { ClarityTypes, Transaction } from "lib-shared";

export interface TaralStorageContract {
  addPrincipalToRole: (
    roleToAdd: number | bigint,
    principalToAdd: string
  ) => Transaction<boolean, bigint>;
  grantAccess: (
    fileId: number | bigint,
    canRead: boolean,
    canWrite: boolean
  ) => Transaction<boolean, bigint>;
  initialize: (
    nameToSet: string,
    symbolToSet: string,
    decimalsToSet: number | bigint,
    initialOwner: string
  ) => Transaction<boolean, bigint>;
  registerFile: (
    filename: string,
    hash: Buffer,
    signature: Buffer
  ) => Transaction<bigint, bigint>;
  removePrincipalFromRole: (
    roleToRemove: number | bigint,
    principalToRemove: string
  ) => Transaction<boolean, bigint>;
  revokeAccess: (fileId: number | bigint) => Transaction<boolean, bigint>;
  updateAccess: (
    fileId: number | bigint,
    canRead: boolean,
    canWrite: boolean
  ) => Transaction<boolean, bigint>;
  updateBlacklisted: (
    principalToUpdate: string,
    setBlacklisted: boolean
  ) => Transaction<boolean, bigint>;
  updateFile: (
    fileId: number | bigint,
    hash: Buffer,
    signature: Buffer
  ) => Transaction<boolean, bigint>;
  canReadFile: (
    participant: string,
    fileId: number | bigint
  ) => Promise<ClarityTypes.Response<boolean, null>>;
  canWriteFile: (
    participant: string,
    fileId: number | bigint
  ) => Promise<ClarityTypes.Response<boolean, null>>;
  detectRestriction: (
    participant: string
  ) => Promise<ClarityTypes.Response<bigint, bigint>>;
  hasRole: (
    roleToCheck: number | bigint,
    principalToCheck: string
  ) => Promise<boolean>;
  hashMessage: (message: Buffer) => Promise<Buffer>;
  isBlacklisted: (principalToCheck: string) => Promise<boolean>;
  validateSignature: (
    hash: Buffer,
    signature: Buffer,
    signer: string
  ) => Promise<boolean>;
  BLACKLISTER_ROLE: () => Promise<bigint>;
  ERR_EMPTY_FILENAME: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FILE_ALREADY_REGISTERED: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERR_FILE_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_FILE_ID: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_PRINCIPAL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_ROLE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNAUTHORIZED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNEXPECTED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNKNOWN_FILE_ACCESS: () => Promise<ClarityTypes.Response<null, bigint>>;
  OWNER_ROLE: () => Promise<bigint>;
  PERMISSION_DENIED_ERROR: () => Promise<bigint>;
  RESTRICTION_BLACKLIST: () => Promise<bigint>;
  RESTRICTION_NONE: () => Promise<bigint>;
  deployerPrincipal: () => Promise<string>;
  filesCount: () => Promise<bigint>;
  isInitialized: () => Promise<boolean>;
  owner: () => Promise<string>;
  blacklist: (key: { account: string }) => Promise<{
    blacklisted: boolean;
  } | null>;
  fileAuthorizations: (key: { id: bigint; participant: string }) => Promise<{
    "can-read": boolean;
    "can-write": boolean;
    owns: boolean;
  } | null>;
  fileHash: (key: { id: bigint }) => Promise<{
    hash: Buffer;
    name: string;
  } | null>;
  fileVersions: (key: { hash: Buffer; id: bigint }) => Promise<{
    "changed-by": string;
  } | null>;
  files: (key: { id: bigint }) => Promise<{
    created: bigint;
    hash: Buffer;
    "last-updated": bigint;
    name: string;
  } | null>;
  filesByName: (key: {
    hash: Buffer;
    name: string;
    participant: string;
  }) => Promise<{
    id: bigint;
  } | null>;
  roles: (key: { account: string; role: bigint }) => Promise<{
    allowed: boolean;
  } | null>;
}
