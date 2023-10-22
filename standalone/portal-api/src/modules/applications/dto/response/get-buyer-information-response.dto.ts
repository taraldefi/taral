import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { GetBuyerResponse } from 'src/modules/buyer/dto/response/get-buyer-response.dto';
import { GetRelationshipResponse } from 'src/modules/relationship/dto/response/get-relationship-response.dto';

export class BuyerInformationResponse {
  @ApiProperty()
  @ValidateNested()
  @Type(() => GetBuyerResponse)
  buyer: GetBuyerResponse;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetRelationshipResponse)
  relationshipWithSupplier: GetRelationshipResponse;
}
