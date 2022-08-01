import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'src/core/modules/multipart';

export class UpdateFileDataDto {
  @IsFile()
  @MaxFileSize(100e6)
  @HasMimeType(['application/octet-stream'])
  @ApiProperty({
    example: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  newFile: MemoryStoredFile;

  @ApiProperty({ example: 'c074f1ae-3f34-4b95-a103-328e94ef733a' })
  @IsNumberString()
  id: string;

  @ApiProperty({
    example:
      '5bd25b481e3bce3d8c70c7e8165c32a2ded778f7ef5de3af38f13062ead0410e64ac1ba7459be3a491e3d4ecc971a63b6a994d470899f35cbcab60851759475800',
  })
  @IsNotEmpty()
  @IsString()
  signature: string;

  @ApiProperty({ example: 'hello' })
  @IsNotEmpty()
  @IsString()
  signedMessage: string;
}
