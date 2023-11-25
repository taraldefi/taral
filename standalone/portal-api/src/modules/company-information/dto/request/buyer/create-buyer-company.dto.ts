import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateBuyerCompanyTaxAndRevenueRequest } from './create-buyer-company-tax-and-revenue.dto';
import { CreateBuyerCompanyAddressRequest } from './create-buyer-company-address.dto';
import { Type } from 'class-transformer';

export class CreateBuyerCompanyRequest {
  @ApiProperty({ example: '1234567891' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '1' })
  @IsOptional()
  @IsNumber()
  employeeCount?: number;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @IsString()
  registrationNumbers: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateBuyerCompanyTaxAndRevenueRequest)
  taxAndRevenue?: CreateBuyerCompanyTaxAndRevenueRequest;

  @ValidateNested()
  @Type(() => CreateBuyerCompanyAddressRequest)
  address: CreateBuyerCompanyAddressRequest;
}
