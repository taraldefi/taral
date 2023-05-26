/**
 * Should correspond to both a git tag on the blockstack-core repo and a
 * set of clarity-binary distributables uploaded to the cloud storage endpoint.
 */
export const CORE_SDK_TAG = "2.3.0.0.2";

export const BLOCKSTACK_CORE_SOURCE_PATH_ENV_VAR =
    "BLOCKSTACK_CORE_SOURCE_PATH";
export const CLARITY_CLI_SOURCE_PATH = "CLARITY_CLI_SOURCE_PATH";

export const DIST_DOWNLOAD_URL_TEMPLATE =
    "https://github.com/blockstack/stacks-blockchain/releases/" +
    "download/{tag}/{platform}-{arch}.zip";

export const MACOS_ARM_URL =
    "https://gateway.pinata.cloud/ipfs/QmT66UdArWY3hYTcvimRer5orHEfMNgbWLBe8Rj5LJtKs9";

export const enum SupportedDistPlatform {
    WINDOWS = "windows",
    MACOS = "macos",
    LINUX = "linux",
    LINUX_MUSL = "linux-musl",
}

export const enum SupportedDistArch {
    x64 = "x64",
}

export const CONTRACT_FILE_EXT = ".clar";
