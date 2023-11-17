import { ApiProperty } from '@nestjs/swagger';
import { GetApplicationResponse } from './get-application-response.dto';
import { GetProductResponse } from './get-product-response.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateSupplierCompanyAddressRequest } from 'src/modules/supplier/dto/request/create-supplier-company-address.dto';
import { CreateSupplierCompanyTaxAndRevenueRequest } from 'src/modules/supplier/dto/request/create-supplier-company-tax-and-revenue.dto';
import { GetSupplierCompanyTaxAndRevenueRequest } from 'src/modules/company-information/dto/response/supplier/get-supplier-company-tax-and-revenue.response.dto';
import { GetSupplierCompanyAddressRequest } from 'src/modules/company-information/dto/response/supplier/get-supplier-company-address-response.dto';

export class GetSupplierEntityDetailsResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025.png' })
  logo: string;

  @ApiProperty({ example: 'Engelbrecht Ltd' })
  name: string;

  @ApiProperty({ example: 'John Smith' })
  beneficialOwner: string;

  @ApiProperty({ example: '55-NB' })
  abbreviation: string;

  @ApiProperty({ example: 'German' })
  nationality: string;

  @ApiProperty({ example: 'Berlin' })
  headquarters: string;

  @ApiProperty({ example: 'Information Technology' })
  industryType: string;

  @ApiProperty({ example: 'Software Development' })
  coreBusiness: string;

  @ApiProperty({ example: '12-12-2022' })
  incorporationDate: Date;

  @ApiProperty({ example: 'Limited' })
  legalForm: string;

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
  @Type(() => GetSupplierCompanyTaxAndRevenueRequest)
  taxAndRevenue?: GetSupplierCompanyTaxAndRevenueRequest;

  @ValidateNested()
  @Type(() => GetSupplierCompanyAddressRequest)
  address: GetSupplierCompanyAddressRequest;
}
