import { StreamableFile } from '@nestjs/common';

export class RequestFileModel {
  name: string;
  file: StreamableFile;
}
