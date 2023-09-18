import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCollateralDto {
  @IsString()
  @IsNotEmpty()
  facilityType: string;

  @IsNumber()
  @IsNotEmpty()
  financingRatio: number;

  @IsNumber()
  @IsNotEmpty()
  facilityAmount: number;

  @IsNotEmpty()
  requestedTenure: Date;

  @IsString()
  @IsNotEmpty()
  requestedPurpose: string;

  @IsString()
  @IsNotEmpty()
  repaymentSource: string;

  @IsString()
  @IsNotEmpty()
  collateralProviderInfluence: string;

  @IsString()
  @IsNotEmpty()
  collateralProviderExperience: string;
}
