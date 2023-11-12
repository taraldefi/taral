import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsString } from 'class-validator';

export class GetPaymentTermResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({
    example: true,
  })
  isConcluded: boolean;

  @ApiProperty({
    example: true,
  })
  partialRefinancing: boolean;

  @IsBoolean()
  interestExists: boolean;

  @ApiProperty({
    example: 'EUR',
  })
  @IsString()
  interestCurrency: string;

  @ApiProperty({
    example: 5,
  })
  @IsDecimal()
  interestPercentage: number;

  @IsString()
  interestType: string;

  @ApiProperty({
    example: 6.8,
  })
  @IsDecimal()
  interestFixedRate: number;

  @ApiProperty({
    example: 4,
  })
  @IsDecimal()
  interestDegressiveRate: number;

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
