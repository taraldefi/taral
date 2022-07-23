import { readFileSync } from "fs";
import { getRootDirectory } from "lib-shared";

export function readTestFile(filename: string): Buffer {
  const filePath = `${getRootDirectory()}/packages/unit-tests/${filename}`;
  const fileBuffer = readFileSync(filePath);

  return fileBuffer;
}
