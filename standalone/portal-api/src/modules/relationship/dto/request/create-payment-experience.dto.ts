import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentExperienceRequest {
  @ApiProperty({ example: 'Provider' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'Years' })
  @IsOptional()
  length: string;

  @ApiProperty({ example: '12' })
  @IsOptional()
  noOfDeals: number;

  @ApiProperty({ example: '1000000' })
  @IsOptional()
  avgBusinessVol: string;

  @ApiProperty({ example: 'ON_TIME' })
  @IsOptional()
  @IsEnum(['ON_TIME', 'DELAYS'])
  history: string;

  @ApiProperty({ example: 'Explanation if there were delays in payment' })
  @IsOptional()
  delays: string;
}
