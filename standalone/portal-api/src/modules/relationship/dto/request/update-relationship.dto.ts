import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreatePaymentExperienceRequest } from "./create-payment-experience.dto";
import { Type } from "class-transformer";

export class UpdateRelationshipRequest {
    @ApiProperty({ example: 'Relationship' })
    @IsNotEmpty()
    @IsString()
    shareHoldingRelationship: string;
  
    @ApiProperty({ example: 'Influence' })
    @IsNotEmpty()
    @IsString()
    influence: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreatePaymentExperienceRequest)
    paymentExperience: CreatePaymentExperienceRequest;
}