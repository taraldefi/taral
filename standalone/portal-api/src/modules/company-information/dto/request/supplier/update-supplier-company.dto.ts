import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { UpdateRelationshipRequest } from 'src/modules/relationship/dto/request/update-relationship.dto';

export class UpdateSupplierInformationRequest {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  @IsNotEmpty()
  @IsString()
  supplierId: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateRelationshipRequest)
  relationshipWithSupplier: UpdateRelationshipRequest;
}
