import { ApiProperty } from "@nestjs/swagger";
import { GetPaymentExperienceResponse } from "./get-payment-experience-response.dto";

export class GetRelationshipResponse {
    @ApiProperty({ example: 'Relationship' })
    shareHoldingRelationship: string;
  
    @ApiProperty({ example: 'Influence' })
    influence: string;

    @ApiProperty()
    paymentExperience: GetPaymentExperienceResponse;
}