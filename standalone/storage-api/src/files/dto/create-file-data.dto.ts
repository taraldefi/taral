import { ApiProperty } from '@nestjs/swagger';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'src/core/modules/multipart';
import { FileParticipantDto } from './file-participant.dto';

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

  @ApiProperty({
    example: {
      owner: {
        signature: '0x000000000000000'
      },
    },
  })
  owner: FileParticipantDto;
}
