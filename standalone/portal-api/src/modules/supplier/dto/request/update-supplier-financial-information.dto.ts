import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSupplierFinancialInformationRequest {
  @ApiProperty({ example: 1000_000.0 })
  @IsNotEmpty()
  @IsNumber()
  turnover: number;

  @ApiProperty({ example: 1000_000.0 })
  @IsNotEmpty()
  @IsNumber()
  balanceSheetTotal: number;
}
