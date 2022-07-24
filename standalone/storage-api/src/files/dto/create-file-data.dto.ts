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
        signature: '0x5bd25b481e3bce3d8c70c7e8165c32a2ded778f7ef5de3af38f13062ead0410e64ac1ba7459be3a491e3d4ecc971a63b6a994d470899f35cbcab60851759475800',
        signedMessage: 'hello'
      },
    },
  })
  owner: FileParticipantDto;
}
