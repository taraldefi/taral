import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RequestFileDataDto {
  @IsUUID()
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
