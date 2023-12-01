import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSupplierCompanyTaxAndRevenueRequest {
  @ApiProperty({ example: 'Engelbrecht Ltd' })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiProperty({ example: 2023 })
  @IsNumberString()
  lastFiscalYear?: number;

  @ApiProperty({ example: '1000000000' })
  @IsNotEmpty()
  @IsNumberString()
  totalRevenue: string;

  @ApiProperty({ example: '1000000000' })
  @IsNumberString()
  @IsOptional()
  exportValue?: number;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  @IsOptional()
  audited?: boolean;

  @ApiProperty({ example: '15' })
  @IsOptional()
  @IsNumberString()
  exportRevenuePercentage?: number;
}
