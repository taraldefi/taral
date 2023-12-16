import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetBuyerCompanyTaxAndRevenueRequest {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({ example: 'Engelbrecht Ltd' })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiProperty({ example: 2022 })
  @IsNotEmpty()
  lastFiscalYear: number;

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
