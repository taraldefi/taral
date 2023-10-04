import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsString } from 'class-validator';

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

  @ApiProperty({
    example: 6.8,
  })
  @IsDecimal()
  interestFixedRate: number;

  @ApiProperty({
    example: 4,
  })
  @IsDecimal()
  interestRegressiveRate: number;

  @ApiProperty({
    example: 'annuity',
  })
  @IsString()
  paymentType: string;

  @ApiProperty({
    example: '60 days',
  })
  @IsString()
  paymentDuration: string;
}