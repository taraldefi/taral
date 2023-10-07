import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateBuyerQuickApplicationResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ example: '12-12-2022' })
  @IsDateString()
  issuanceDate: Date;

  @ApiProperty({ example: 'ACTIVE' })
  @IsString()
  status: string;
}
