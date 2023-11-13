import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePaymentExperienceRequest } from './create-payment-experience.dto';
import { Type } from 'class-transformer';

export class CreateRelationshipRequest {
  @ApiProperty({ example: 'Relationship' })
  @IsOptional()
  shareHoldingRelationship: string;

  @ApiProperty({ example: 'Influence' })
  @IsOptional()
  influence: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePaymentExperienceRequest)
  paymentExperience: CreatePaymentExperienceRequest;
}
