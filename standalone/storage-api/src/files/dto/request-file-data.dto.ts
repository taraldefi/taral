import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { FileParticipantDto } from './file-participant.dto';

export class RequestFileDataDto {
  @IsNumberString()
  externalId: number;

  @ApiProperty({
    example: {
      owner: {
        signature:
          '0x5bd25b481e3bce3d8c70c7e8165c32a2ded778f7ef5de3af38f13062ead0410e64ac1ba7459be3a491e3d4ecc971a63b6a994d470899f35cbcab60851759475800',
        signedMessage: 'hello',
      },
    },
  })
  owner: FileParticipantDto;
}
