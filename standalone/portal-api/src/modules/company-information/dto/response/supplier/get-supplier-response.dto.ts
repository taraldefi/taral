import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { GetRelationshipResponse } from 'src/modules/relationship/dto/response/get-relationship-response.dto';

export class SupplierInformationResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  @IsNotEmpty()
  @IsString()
  supplierId: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetRelationshipResponse)
  relationshipWithSupplier: GetRelationshipResponse;
}
