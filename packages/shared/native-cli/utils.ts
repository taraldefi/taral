import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { normalize } from "path";
import { getRootDirectory } from "..";
import { CONTRACT_FILE_EXT, CORE_SDK_TAG } from "./constants";

export function fileExists(filePath: string): boolean {
  try {
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function getContractFilePath(contractFile: string): string {
  function* getLocations(file: string): IterableIterator<string> {
    yield path.resolve(file);
    yield path.resolve("contracts", file);
    yield path.resolve(__dirname, "contracts", file);
    yield path.resolve(__dirname, file);
    if (!file.endsWith(CONTRACT_FILE_EXT)) {
      for (const f of getLocations(file + CONTRACT_FILE_EXT)) {
        yield f;
      }
    }
  }

  // Normalize OS path separators.
  if (path.sep === path.posix.sep && contractFile.includes(path.win32.sep)) {
    contractFile = contractFile.replace(/\\/g, path.sep);
  } else if (
    path.sep === path.win32.sep &&
    contractFile.includes(path.posix.sep)
  ) {
    contractFile = contractFile.replace(/\//g, path.sep);
  }

  for (const filePath of getLocations(contractFile)) {
    if (fileExists(filePath)) {
      return filePath;
    }
  }

  throw new Error(`Could not find contract file: ${contractFile}`);
}

export function getTempFilePath(fileNameTemplate = "temp-{uniqueID}-file") {
  const uniqueID = `${(Date.now() / 1000) | 0}-${Math.random()
    .toString(36)
    .substr(2, 6)}`;
  const fileName = fileNameTemplate.replace("{uniqueID}", uniqueID);
  return path.join(os.tmpdir(), fileName);
}

export function getNormalizedContractFilePath(
  contractFilePath: string
): string {
  const filePath = getContractFilePath(contractFilePath);
  const contractSource = fs
    .readFileSync(filePath, "utf8")
    .replace(/\r/g, "")
    .replace(/\t/g, " ");
  const tempName = `blockstack-contract-${path.basename(contractFilePath)}`;
  const tempFilePath = getTempFilePath(`${tempName}-{uniqueID}.clar`);
  fs.writeFileSync(tempFilePath, contractSource);
  return tempFilePath;
}

/**
 * Returns the full file path of the native clarity-cli executable.
 * Throws an error if it does not exist.
 * @param checkExists [Default = true] If true then an error is thrown if the file does not exist.
 * @param versionTag Defaults to the current `CORE_SDK_TAG`.
 */
export function getDefaultBinaryFilePath({
  checkExists = true,
  versionTag,
}: { checkExists?: boolean; versionTag?: string } = {}): string {
  if (!versionTag) {
    versionTag = CORE_SDK_TAG;
  }
  const thisPkgDir = path.resolve(getThisWorkspaceDir());
  const binFileName = getExecutableFileName("clarity-cli");
  const binFilePath = path.join(
    thisPkgDir,
    ".native-bin",
    versionTag,
    binFileName
  );
  if (checkExists && !fs.existsSync(binFilePath)) {
    throw new Error(
      `Native binary does not appear to be installed at ${binFilePath}`
    );
  }
  return binFilePath;
}

/**
 * If the current platform is Windows then returns [[file]] with
 * the `.exe` extension appended.
 * Otherwise, returns the given [[file]] unchanged.
 * @param file A file name or path to file.
 */
export function getExecutableFileName(file: string) {
  if (os.platform() === "win32" || os.platform() === "cygwin") {
    const windowsExecutableExt = ".exe";
    if (path.extname(file) !== windowsExecutableExt) {
      return `${file}${windowsExecutableExt}`;
    }
  }
  return file;
}

/**
 * Resolve the directory of the currently executing package
 * @see https://stackoverflow.com/a/49455609/794962
 */
export function getThisWorkspaceDir(): string {
  const packagePath = path.dirname(`${normalize(getRootDirectory()).replace(/\\/g, "/")}/package.json`);
  return packagePath;
}
