import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

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

  @ApiProperty({
    example: 'EUR',
  })
  @IsString()
  interestCurrency?: string;

  @ApiProperty({
    example: 5,
  })
  @IsDecimal()
  interestPercentage?: number;

  @ApiProperty({
    example: 6.8,
  })
  @IsDecimal()
  interestFixedRate?: number;

  @ApiProperty({
    example: 4,
  })
  @IsDecimal()
  @IsOptional()
  interestRegressiveRate?: number;

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
