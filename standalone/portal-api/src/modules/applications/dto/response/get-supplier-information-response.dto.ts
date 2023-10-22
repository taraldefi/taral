import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { GetRelationshipResponse } from 'src/modules/relationship/dto/response/get-relationship-response.dto';
import { GetSupplierResponse } from 'src/modules/supplier/dto/response/get-supplier-response.dto';

export class SupplierInformationResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetSupplierResponse)
  supplier: GetSupplierResponse;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetRelationshipResponse)
  relationshipWithSupplier: GetRelationshipResponse;
}
