import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateBuyerCompanyTaxAndRevenueRequest } from '../../../../company/dto/request/create-buyer-company-tax-and-revenue.dto';
import { CreateBuyerCompanyAddressRequest } from './create-buyer-company-address.dto';
import { Type } from 'class-transformer';

export class CreateBuyerCompanyRequest {
  @ApiProperty({ example: '1' })
  @IsOptional()
  @IsNumber()
  employeeCount?: number;

  @ValidateNested()
  @Type(() => CreateBuyerCompanyAddressRequest)
  address: CreateBuyerCompanyAddressRequest;
}
