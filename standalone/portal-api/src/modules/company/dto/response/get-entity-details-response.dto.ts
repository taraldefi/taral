import { ApiProperty } from '@nestjs/swagger';
import { GetApplicationResponse } from './get-application-response.dto';
import { GetProductResponse } from './get-product-response.dto';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetSupplierCompanyTaxAndRevenueRequest } from 'src/modules/company-information/dto/response/supplier/get-supplier-company-tax-and-revenue.response.dto';
import { GetBuyerCompanyTaxAndRevenueRequest } from 'src/modules/company-information/dto/response/buyer/get-buyer-company-tax-and-revenue.response.dto';

export class GetEntityDetailsResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025.png' })
  logo: string;

  @ApiProperty({ example: 'Engelbrecht Ltd' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty()
  stripeId: string;

  @ApiProperty({ example: '1234567891' })
  phoneNumber: string;

  @ApiProperty({ example: '123456789' })
  registrationNumber: string;

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

  @ApiProperty({
    example: {
      id: '05159674-06ea-4bc2-b750-603b0f454025',
      title: 'Product Title',
      issuanceDate: '12-12-2022',
      maturityDate: '12-12-2022',
      amount: 650000,
    },
  })
  products: GetProductResponse[];

  @ValidateNested()
  @IsOptional()
  @Type(() => GetBuyerCompanyTaxAndRevenueRequest)
  taxAndRevenue?: GetBuyerCompanyTaxAndRevenueRequest;

  @ApiProperty({
    example: {
      id: '05159674-06ea-4bc2-b750-603b0f454025',
      title: 'Application Title',
      issuanceDate: '12-12-2022',
    },
  })
  applications: GetApplicationResponse[];
}
