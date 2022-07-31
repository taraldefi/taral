import { Buffer } from "buffer";
import fs from "fs";
import path from "path";

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
  const filePath = path.join(__dirname, `../../storage/${filename}`);

  const fileStream: Buffer = fs.readFileSync(filePath);

  var result = fileStream.toString(encoding);

  return result;
}
