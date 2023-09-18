import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCollateralDto {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

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
