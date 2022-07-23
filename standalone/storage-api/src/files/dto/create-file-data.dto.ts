import { ApiProperty } from '@nestjs/swagger';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'src/core/modules/multipart';

export class CreateFileDataDto {
  @IsFile()
  @MaxFileSize(100e6)
  @HasMimeType(['application/pdf'])
  @ApiProperty({
    example: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  file: MemoryStoredFile;
}
