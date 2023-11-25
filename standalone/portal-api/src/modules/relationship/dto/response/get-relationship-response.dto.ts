import { ApiProperty } from '@nestjs/swagger';
import { GetPaymentExperienceResponse } from './get-payment-experience-response.dto';

export class GetRelationshipResponse {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty()
  paymentExperience: GetPaymentExperienceResponse;
}
