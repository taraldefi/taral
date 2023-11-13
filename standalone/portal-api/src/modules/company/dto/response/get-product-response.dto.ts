import { ApiProperty } from '@nestjs/swagger';

export class GetProductResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({ example: 'Product Title' })
  title: string;

  @ApiProperty({ example: '12-12-2022' })
  issuanceDate: Date;

  @ApiProperty({ example: '12-12-2022' })
  maturityDate: Date;

  @ApiProperty({ example: '650000' })
  amount: number;
}
