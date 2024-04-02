import { ApiProperty } from '@nestjs/swagger';

export class GetPaymentExperienceResponse {
  exists: boolean;
  @ApiProperty({ example: 'Provider' })
  description: string;

  @ApiProperty({ example: 'Years' })
  length: string;

  @ApiProperty({ example: '12' })
  noOfDeals: number;

  @ApiProperty({ example: '1000000' })
  avgBusinessVol: string;

  @ApiProperty({ example: 'USD' })
  currency: string;

  @ApiProperty({ example: 'ON_TIME' })
  history: string;

  @ApiProperty({ example: 'Explanation if there were delays in payment' })
  delays: string;
}
