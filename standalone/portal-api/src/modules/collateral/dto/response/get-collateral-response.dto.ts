import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FacilityType } from '../../enums/facility.enum';

export class GetCollateralResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({
    description: 'Facility type',
    example: 'IMPORTER_FINANCING or EXPORTER_FINANCING',
  })
  @IsString()
  @IsEnum(FacilityType)
  @IsNotEmpty()
  facilityType: string;

  @ApiProperty({
    description: 'Financing ratio',
    example: 0.8,
  })
  @IsNumber()
  @IsNotEmpty()
  financingRatio: number;

  @ApiProperty({
    description: 'Facility amount',
    example: 100000,
  })
  @IsNumber()
  @IsNotEmpty()
  facilityAmount: number;

  @ApiProperty({
    description: 'Requested tenure',
    example: '2021-08-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  requestedTenure: Date;

  @ApiProperty({
    description: 'Requested purpose',
    example: 'Working capital',
  })
  @IsString()
  @IsNotEmpty()
  requestedPurpose: string;

  @ApiProperty({
    description: 'Repayment source',
    example: 'Sales',
  })
  @IsString()
  @IsNotEmpty()
  repaymentSource: string;

  @ApiProperty({
    description: 'Collateral provider influence',
    example: 'High',
  })
  @IsString()
  @IsNotEmpty()
  collateralProviderInfluence: string;

  @ApiProperty({
    description: 'Collateral provider experience',
    example: 'High',
  })
  @IsString()
  @IsNotEmpty()
  collateralProviderExperience: string;
}
