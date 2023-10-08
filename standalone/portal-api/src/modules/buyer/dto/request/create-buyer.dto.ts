import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateBuyerCompanyRequest } from './create-buyer-company.dto';
import { CreateBuyerSectorRequest } from './create-buyer-sector.dto';

export class CreateBuyerRequest {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateBuyerCompanyRequest)
  company: CreateBuyerCompanyRequest;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateBuyerSectorRequest)
  sector: CreateBuyerSectorRequest;
}
