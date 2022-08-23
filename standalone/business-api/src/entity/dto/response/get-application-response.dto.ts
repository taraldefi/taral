import { ApiProperty } from '@nestjs/swagger';

export class GetApplicationResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({ example: 'Application Title' })
  title: string;

  @ApiProperty({ example: '12-12-2022' })
  issuanceDate: Date;
}
