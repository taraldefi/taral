import cp, {
  spawnSync,
  SpawnSyncOptionsWithStringEncoding,
} from "child_process";
import * as fs from "fs";
import { readdirSync } from "fs";
import * as fsExtra from "fs-extra";
import fetch from "node-fetch";
import * as os from "os";
import { platform } from "os";
import * as path from "path";
import { pipeline } from "stream";
import * as unzip from "unzipper";
import { promisify } from "util";
import { Logger } from "..";
import {
  BLOCKSTACK_CORE_SOURCE_PATH_ENV_VAR,
  CLARITY_CLI_SOURCE_PATH,
  CORE_SDK_TAG,
  DIST_DOWNLOAD_URL_TEMPLATE,
  MACOS_ARM_URL,
  SupportedDistArch,
  SupportedDistPlatform,
} from "./constants";
import { getDefaultBinaryFilePath, getExecutableFileName } from "./utils";

const pipelineAsync = promisify(pipeline);

export async function installDefaultPath(): Promise<boolean> {
  const installPath = getDefaultBinaryFilePath({ checkExists: false });

  const versionTag: string | undefined = CORE_SDK_TAG;

  // Check if source git tag/branch was specified using env var
  const localPath = getOverriddenCoreSource();

  if (localPath) {
    Logger.debug(`Found path source env var ${localPath}`);
    return moveFromPath({
      outputFilePath: installPath,
      inputFilePAth: localPath,
    });
  }

  const outputIsValid = verifyOutputFile(true, installPath);
  if (!outputIsValid) {
    return false;
  }

  const success = await fetchDistributable({
    overwriteExisting: true,
    outputFilePath: installPath,
    versionTag: versionTag,
  });

  return success;
}

/**
 * Checks if the currently executing platform and architecture has an distributable available
 * for download.
 * @param logger Optionally log error message for unsupported platform or arch.
 */
function isDistAvailable():
  | { platform: SupportedDistPlatform; arch: SupportedDistArch }
  | false {
  let arch: SupportedDistArch;
  const detectedArch = detectArch();
  switch (detectedArch) {
    case "x64":
      arch = SupportedDistArch.x64;
      break;
    default:
      if (!isMacArm()) {
        Logger.error(
          `System arch "${detectedArch}" not supported. Must build from source.`
        );
      }
      return false;
  }

  let platform: SupportedDistPlatform;
  switch (os.platform()) {
    case "win32":
    case "cygwin":
      platform = SupportedDistPlatform.WINDOWS;
      break;
    case "darwin":
      platform = SupportedDistPlatform.MACOS;
      break;
    case "linux":
      if (detectLibc().isNonGlibcLinux) {
        platform = SupportedDistPlatform.LINUX_MUSL;
      } else {
        platform = SupportedDistPlatform.LINUX;
      }
      break;
    default:
      Logger.error(
        `System platform "${os.platform()}" not supported. Must build from source.`
      );
      return false;
  }
  return {
    platform,
    arch,
  };
}

/**
 * Gets a download url for a dist archive containing a binary that
 * can run in the currently executing system OS and architecture.
 * Returns false if system is incompatible with known available distributables.
 */
function getDownloadUrl(versionTag: string): string | false {
  const distInfo = isDistAvailable();
  if (!distInfo) {
    return false;
  }
  const downloadUrl = DIST_DOWNLOAD_URL_TEMPLATE.replace("{tag}", versionTag)
    .replace("{platform}", distInfo.platform)
    .replace("{arch}", distInfo.arch);
  return downloadUrl;
}

/**
 * Returns true if install was successful.
 * @param opts
 */
async function fetchDistributable(opts: {
  overwriteExisting: boolean;
  outputFilePath: string;
  versionTag: string;
}): Promise<boolean> {
  const downloadUrl = getDownloadUrl(opts.versionTag);

  const didMacDownload = await downloadMacArm(opts.outputFilePath);
  if (didMacDownload) return true;

  if (!downloadUrl) return false;

  Logger.debug(`Fetching ${downloadUrl}`);
  const httpResponse = await fetch(downloadUrl, { redirect: "follow" });
  if (!httpResponse.ok) {
    Logger.error(
      `Bad http response ${httpResponse.status} ${httpResponse.statusText}`
    );
    return false;
  }

  const tempExtractDir = makeUniqueTempDir();
  Logger.debug(`Extracting to temp dir ${tempExtractDir}`);

  const unzipStream = unzip.Extract({ path: tempExtractDir });
  await pipelineAsync(httpResponse.body, unzipStream);

  const binFileName = getExecutableFileName("clarity-cli");
  const tempBinFilePath = path.join(tempExtractDir, binFileName);

  Logger.debug(`Moving ${tempBinFilePath} to ${opts.outputFilePath}`);
  fsExtra.moveSync(tempBinFilePath, opts.outputFilePath);
  fsExtra.removeSync(tempExtractDir);
  fsExtra.chmodSync(opts.outputFilePath, 0o775);

  return true;
}

function isMacArm() {
  return os.platform() === "darwin" && os.arch() === "arm64";
}

async function downloadMacArm(outputFilePath: string) {
  if (isMacArm()) {
    Logger.debug("Fetching Apple Silicon version of clarity-cli");
    const downloadUrl = MACOS_ARM_URL;
    const httpResponse = await fetch(downloadUrl, { redirect: "follow" });
    if (!httpResponse.ok) {
      Logger.error(
        `Bad http response ${httpResponse.status} ${httpResponse.statusText}`
      );
      return false;
    }
    await pipelineAsync(
      httpResponse.body,
      fs.createWriteStream(outputFilePath)
    );
    fs.chmodSync(outputFilePath, 0o775);
    return true;
  } else {
    return false;
  }
}

function makeUniqueTempDir() {
  const osTempDir = os.tmpdir();
  const uniqueTempDir = fs.mkdtempSync(`${osTempDir}${path.sep}`);
  return uniqueTempDir;
}

/**
 * Ensures the provided output directory exists and is writable.
 * Deletes the provided output file if it already exists and overwrite has been specified.
 */
function verifyOutputFile(
  overwriteExisting: boolean,
  outputFilePath: string
): boolean {
  const fullFilePath = path.resolve(outputFilePath);
  const outputDirectory = path.dirname(fullFilePath);

  try {
    if (fs.existsSync(fullFilePath)) {
      const stat = fs.lstatSync(fullFilePath);
      if (!stat.isFile()) {
        Logger.error(
          `The specified output file path exists and is not a file: ${fullFilePath}`
        );
        return false;
      }
      if (!overwriteExisting) {
        Logger.error(
          `The specified output file path already exists: ${fullFilePath}`
        );
        Logger.error("Specify the overwrite option to ignore this error.");
        return false;
      }
      Logger.debug(`Overwriting existing file: ${fullFilePath}`);
      fs.unlinkSync(fullFilePath);
    } else {
      fsExtra.mkdirpSync(outputDirectory);
    }
    return true;
  } catch (error) {
    Logger.error(error as any);
    const fsErr = error as NodeJS.ErrnoException;
    if (fsErr.code === "EACCES" || fsErr.code === "EPERM") {
      Logger.error(`Permission error writing to ${fullFilePath}`);
      Logger.error("Try running with sudo or elevated permissions");
    } else {
      Logger.error(`Error writing to ${fullFilePath}`);
    }
    return false;
  }
}

const moveFromPath = (opts: {
  outputFilePath: string;
  inputFilePAth: string;
}) => {
  Logger.debug(`Copying ${opts.inputFilePAth} to ${opts.outputFilePath}`);
  const dirName = path.dirname(opts.outputFilePath);
  fsExtra.mkdirpSync(dirName);
  fs.copyFileSync(opts.inputFilePAth, opts.outputFilePath);
  return true;
};

/**
 * A git tag or branch name can be specified as an env var.
 * See [[BLOCKSTACK_CORE_SOURCE_TAG_ENV_VAR]] and [[BLOCKSTACK_CORE_SOURCE_BRANCH_ENV_VAR]].
 * @returns If an environment var is specified then returns the tag/branch string value.
 * Otherwise returns false.
 */
function getOverriddenCoreSource(): string | undefined {
  const oldEnv = process.env[BLOCKSTACK_CORE_SOURCE_PATH_ENV_VAR];
  const env = process.env[CLARITY_CLI_SOURCE_PATH] || oldEnv;
  if (env) return env;
  return;
}

function detectArch(): string {
  try {
    /**
     * The running binary is 64-bit, so the OS is clearly 64-bit.
     */
    if (process.arch === "x64") {
      return "x64";
    }

    /**
     * On Windows, the most reliable way to detect a 64-bit OS from within a 32-bit
     * app is based on the presence of a WOW64 file: %SystemRoot%\SysNative.
     * See: https://twitter.com/feross/status/776949077208510464
     */
    if (process.platform === "win32" && os.arch() === "ia32") {
      let useEnv = false;
      try {
        useEnv = !!(
          process.env.SYSTEMROOT && fs.statSync(process.env.SYSTEMROOT)
        );
      } catch (err) {
        // ignore
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const sysRoot = useEnv ? process.env.SYSTEMROOT! : "C:\\Windows";

      // If %SystemRoot%\SysNative exists, we are in a WOW64 FS Redirected application.
      let isWOW64 = false;
      try {
        isWOW64 = !!fs.statSync(path.join(sysRoot, "sysnative"));
      } catch (err) {
        // ignore
      }
      if (isWOW64) {
        return "x64";
      }
    }

    /**
     * On Linux, use the `getconf` command to get the architecture.
     */
    if (process.platform === "linux" && os.arch() === "ia32") {
      const output = cp.execSync("getconf LONG_BIT", { encoding: "utf8" });
      if (output === "64\n") {
        return "x64";
      }
    }
  } catch (error) {
    Logger.error(
      `Unexpected error trying to detect system architecture: ${error}`
    );
  }

  /**
   * If none of the above, fallback to os.arch()
   */
  return os.arch();
}

function detectLibc() {
  const GLIBC = "glibc";
  const MUSL = "musl";

  const spawnOptions: SpawnSyncOptionsWithStringEncoding = {
    encoding: "utf8",
    env: process.env,
  };

  function contains(needle: string) {
    return (haystack: string) => {
      return haystack.indexOf(needle) !== -1;
    };
  }

  function versionFromMuslLdd(out: string) {
    return out
      .split(/[\r\n]+/)[1]
      .trim()
      .split(/\s/)[1];
  }

  function safeReaddirSync(path: string) {
    try {
      return readdirSync(path);
    } catch (e) {
      // ignore
    }
    return [];
  }

  let family = "";
  let version = "";
  let method = "";

  if (platform() === "linux") {
    // Try getconf
    const glibc = spawnSync("getconf", ["GNU_LIBC_VERSION"], spawnOptions);
    if (glibc.status === 0) {
      family = GLIBC;
      version = glibc.stdout.trim().split(" ")[1];
      method = "getconf";
    } else {
      // Try ldd
      const ldd = spawnSync("ldd", ["--version"], spawnOptions);
      if (ldd.status === 0 && ldd.stdout.indexOf(MUSL) !== -1) {
        family = MUSL;
        version = versionFromMuslLdd(ldd.stdout);
        method = "ldd";
      } else if (ldd.status === 1 && ldd.stderr.indexOf(MUSL) !== -1) {
        family = MUSL;
        version = versionFromMuslLdd(ldd.stderr);
        method = "ldd";
      } else {
        // Try filesystem (family only)
        const lib = safeReaddirSync("/lib");
        if (lib.some(contains("-linux-gnu"))) {
          family = GLIBC;
          method = "filesystem";
        } else if (lib.some(contains("libc.musl-"))) {
          family = MUSL;
          method = "filesystem";
        } else if (lib.some(contains("ld-musl-"))) {
          family = MUSL;
          method = "filesystem";
        } else {
          const usrSbin = safeReaddirSync("/usr/sbin");
          if (usrSbin.some(contains("glibc"))) {
            family = GLIBC;
            method = "filesystem";
          }
        }
      }
    }
  }

  const isNonGlibcLinux = family !== "" && family !== GLIBC;
  return {
    GLIBC: GLIBC,
    MUSL: MUSL,
    family: family,
    version: version,
    method: method,
    isNonGlibcLinux: isNonGlibcLinux,
  };
}
