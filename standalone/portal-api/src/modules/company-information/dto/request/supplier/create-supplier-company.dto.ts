import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateRelationshipRequest } from 'src/modules/relationship/dto/request/create-relationship.dto';

export class CreateSupplierInformationRequest {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  @IsNotEmpty()
  @IsString()
  supplierId: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateRelationshipRequest)
  relationshipWithSupplier: CreateRelationshipRequest;
}
