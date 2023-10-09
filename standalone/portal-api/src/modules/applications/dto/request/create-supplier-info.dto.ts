import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateRelationshipRequest } from 'src/modules/relationship/dto/request/create-relationship.dto';
import { CreateSupplierRequest } from 'src/modules/supplier/dto/request/create-supplier.dto';

export class CreateSupplierInformationRequest {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSupplierRequest)
  supplierInformation: CreateSupplierRequest;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateRelationshipRequest)
  relationshipWithSupplier: CreateRelationshipRequest;
}
