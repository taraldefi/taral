import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsString, IsOptional } from 'class-validator';

export class CreatePaymentTermDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isConcluded: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  partialRefinancing: boolean;

  @IsBoolean()
  interestExists: boolean;

  @ApiProperty({
    example: 'EUR',
  })
  @IsString()
  @IsOptional()
  interestCurrency?: string;

  @ApiProperty({
    example: 5,
  })
  @IsDecimal()
  @IsOptional()
  interestPercentage?: number;

  @IsString()
  interestType: string;

  @ApiProperty({
    example: 6.8,
  })
  @IsDecimal()
  @IsOptional()
  interestFixedRate?: number;

  @ApiProperty({
    example: 4,
  })
  @IsDecimal()
  @IsOptional()
  interestDegressiveRate?: number;

  @ApiProperty({
    example: 'annuity',
  })
  @IsString()
  paymentType: string;

  @ApiProperty({
    example: 'USD',
  })
  @IsString()
  downpaymentCurrency: string;

  @ApiProperty({
    example: '10000',
  })
  @IsString()
  downpaymentAmount: string;

  @ApiProperty({
    example: 'downpayment amount for 100 chairs',
  })
  @IsString()
  downpaymentDescription: string;

  @ApiProperty({
    example: 'USD',
  })
  @IsString()
  balanceCurrency: string;

  @ApiProperty({
    example: '80000',
  })
  @IsString()
  balanceAmount: string;

  @ApiProperty({
    example: '12-12-2022',
  })
  @IsString()
  balancePaymentDeadline: string;

  @ApiProperty({
    example: '--',
  })
  @IsString()
  paymentVehicleDescription: string;

  @ApiProperty({
    example: '60 days',
  })
  @IsString()
  paymentDuration: string;
}
