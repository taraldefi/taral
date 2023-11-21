import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePaymentExperienceRequest } from './create-payment-experience.dto';
import { Type } from 'class-transformer';

export class UpdateRelationshipRequest {
  @ApiProperty({ example: 'Relationship' })
  @IsOptional()
  @IsString()
  shareHoldingRelationship: string;

  @ApiProperty({ example: 'Influence' })
  @IsOptional()
  @IsString()
  influence: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePaymentExperienceRequest)
  paymentExperience: CreatePaymentExperienceRequest;
}
