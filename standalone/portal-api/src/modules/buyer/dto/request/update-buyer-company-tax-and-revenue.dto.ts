import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBuyerCompanyTaxAndRevenueRequest {
  @ApiProperty({ example: 'Engelbrecht Ltd' })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiProperty({ example: '12-12-2022' })
  @IsDateString()
  @IsNotEmpty()
  lastFiscalYear: Date;

  @ApiProperty({ example: '1000000000' })
  @IsNotEmpty()
  @IsNumberString()
  totalRevenue: string;

  @ApiProperty({ example: '1000000000' })
  @IsNumberString()
  exportValue?: number;

  @ApiProperty({ example: 'true' })
  @IsOptional()
  @IsBoolean()
  audited?: boolean;

  @ApiProperty({ example: '15' })
  @IsOptional()
  @IsNumberString()
  exportRevenuePercentage?: number;
}
