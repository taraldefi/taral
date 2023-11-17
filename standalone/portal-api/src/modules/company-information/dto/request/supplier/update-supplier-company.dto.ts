import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSupplierCompanyTaxAndRevenueRequest } from './create-supplier-company-tax-and-revenue.dto';
import { CreateSupplierCompanyAddressRequest } from './create-supplier-company-address.dto';
import { Type } from 'class-transformer';

export class UpdateSupplierCompanyRequest {
  @ApiProperty({ example: 'Engelbrecht Ltd' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ example: '1234567891' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '12-12-2022' })
  @IsNotEmpty()
  @IsDateString()
  dateEstablished: Date;

  @ApiProperty({ example: '1' })
  @IsOptional()
  @IsNumber()
  employeeCount?: number;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @IsString()
  registrationNumbers: string;

  @ValidateNested()
  @Type(() => CreateSupplierCompanyTaxAndRevenueRequest)
  taxAndRevenue: CreateSupplierCompanyTaxAndRevenueRequest;

  @ValidateNested()
  @Type(() => CreateSupplierCompanyAddressRequest)
  address: CreateSupplierCompanyAddressRequest;
}
