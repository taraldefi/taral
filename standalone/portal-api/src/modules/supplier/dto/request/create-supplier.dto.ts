import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSupplierCompanyRequest } from './create-supplier-company.dto';
import { CreateSupplierFinancialInformationRequest } from './create-supplier-financial-information.dto';
import { CreateSupplierRatingRequest } from './create-supplier-rating.dto';

export class CreateSupplierRequest {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSupplierCompanyRequest)
  company: CreateSupplierCompanyRequest;

  @ApiProperty()
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateSupplierFinancialInformationRequest)
  financialInformation?: CreateSupplierFinancialInformationRequest;

  @ApiProperty()
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateSupplierRatingRequest)
  rating?: CreateSupplierRatingRequest;
}
