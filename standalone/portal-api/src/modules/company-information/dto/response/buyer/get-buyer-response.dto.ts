import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { GetBuyerCompanyAddressRequest } from './get-buyer-company-address-response.dto';
import { Type } from 'class-transformer';
import { GetBuyerCompanyTaxAndRevenueRequest } from './get-buyer-company-tax-and-revenue.response.dto';

export class GetBuyerResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({ example: 'Home Inc.' })
  companyName: string;

  @ApiProperty({ example: '2021-05-21T00:00:00.000Z' })
  dateEstablished: Date;

  @ApiProperty({ example: '1234567891' })
  phoneNumber: string;

  @ApiProperty({ example: 100 })
  employeeCount?: number;

  @ApiProperty({ example: 100 })
  email?: string;

  @ApiProperty({ example: '123456789' })
  registrationNumber: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetBuyerCompanyAddressRequest)
  address: GetBuyerCompanyAddressRequest;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetBuyerCompanyTaxAndRevenueRequest)
  taxAndRevenue: GetBuyerCompanyTaxAndRevenueRequest;
}
