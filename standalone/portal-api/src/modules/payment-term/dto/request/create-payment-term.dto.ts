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
    example: '60 days',
  })
  @IsString()
  paymentDuration: string;
}
