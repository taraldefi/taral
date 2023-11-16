import { plainToClass, Transform, TransformFnParams } from "class-transformer";
import { StoredFile } from "./StoredFile";
import { FormDataInterceptorConfig } from "../../interfaces/FormDataInterceptorConfig";
const concat = require("concat-stream");

export class MemoryStoredFile extends StoredFile {
  mimetype: string;
  encoding: string;
  originalName: string;
  size: number;

  @Transform((params: TransformFnParams) =>
    params.value instanceof Buffer ? params.value : null,
  )
  buffer: Buffer;

  static create(
    originalName,
    encoding,
    mimetype,
    stream: NodeJS.ReadableStream,
    config: FormDataInterceptorConfig,
  ): Promise<MemoryStoredFile> {
    return new Promise<MemoryStoredFile>((res, rej) => {
      stream.pipe(
        concat({ encoding: "buffer" }, (buffer: Buffer) => {
          const file: MemoryStoredFile = plainToClass(MemoryStoredFile, {
            originalName,
            encoding,
            mimetype,
            buffer,
            size: buffer.length,
          });

          res(file);
        }),
      );
    });
  }

  delete(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
