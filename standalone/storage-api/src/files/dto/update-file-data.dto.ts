import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsPositive } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'src/core/modules/multipart';
import { FileParticipantDto } from './file-participant.dto';

export class UpdateFileDataDto {
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
  newFile: MemoryStoredFile;

  @ApiProperty({ example: '1' })
  @IsNumberString()
  id: number;

  @ApiProperty({
    example: {
      owner: {
        signature: '0x000000000000000'
      },
    },
  })
  owner: FileParticipantDto;
}
