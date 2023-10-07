import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { GetRelationshipResponse } from 'src/modules/relationship/dto/response/get-relationship-response.dto';
import { GetSupplierResponse } from 'src/modules/supplier/dto/response/get-supplier-response.dto';

export class SupplierInformationResponse {
  @ApiProperty()
  @ValidateNested()
  @Type(() => GetSupplierResponse)
  supplier: GetSupplierResponse;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetRelationshipResponse)
  relationshipWithBuyer: GetRelationshipResponse;
}
