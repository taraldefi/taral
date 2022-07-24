import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { FileParticipantDto } from './file-participant.dto';

export class RequestFileDataDto {
  @IsNumberString()
  externalId: number;

  @ApiProperty({
    example: {
      owner: {
        signature: '0x000000000000000'
      },
    },
  })
  owner: FileParticipantDto;
}
