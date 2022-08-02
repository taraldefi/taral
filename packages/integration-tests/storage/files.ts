import fs from "fs";
import path from "path";
import { File } from "./models";
import { writeFileSync } from "fs";
import { join } from "path";

export function readTestFile(): File {
  const filePath = path.join(__dirname, "../testfiles/dummy.pdf");
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileStream = fs.createReadStream(filePath);

  return {
    file: fileStream,
    fileSizeInBytes,
  };
}

// ✅ write to file SYNCHRONOUSLY
export function syncWriteFileWithEncoding(
  filename: string,
  data: any,
  encoding: BufferEncoding
) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */

  console.log("filename ", filename);

  const path = join(__dirname, `../filesystem/${filename}`);
  writeFileSync(path, data, {
    encoding,
  });
}

export function readUnencryptedFileWithEncoding(filename: string): string {
  const filePath = path.join(__dirname, `../testfiles/${filename}`);

  const fileStream: Buffer = fs.readFileSync(filePath);

  var result = fileStream.toString("binary");

  return result;
}

export function readEncryptedFileWithEncoding(
  filename: string,
  encoding: BufferEncoding
): string {
  const filePath = path.join(__dirname, `../filesystem/${filename}`);

  const fileStream: Buffer = fs.readFileSync(filePath);

  var result = fileStream.toString(encoding);

  return result;
}
