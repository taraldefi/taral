import { writeFileSync } from 'fs';
import { join } from 'path';

// ✅ write to file SYNCHRONOUSLY
export function syncWriteFileWithEncoding(filename: string, data: any, encoding: BufferEncoding) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */

  console.log('filename ', filename);

  const path = join(__dirname, `../../storage/${filename}`);
  writeFileSync(path, data, {
    encoding
  });
}