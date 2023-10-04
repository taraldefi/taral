import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GetOrderProductResponse } from './get-order-product-response.dto';

export class GetOrderDetailsResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({
    description: 'Port of import',
    example: 'Port of Shanghai',
  })
  @IsNotEmpty()
  @IsString()
  importPort: string;

  @ApiProperty({
    description: 'Port of export',
    example: 'Port of Singapore',
  })
  @IsNotEmpty()
  @IsString()
  exportPort: string;

  @ApiProperty({
    example: {
      id: '05159674-06ea-4bc2-b750-603b0f454025',
      name: 'Coffee',
      quantity: 30,
      unitPrice: 5,
    },
  })
  products: GetOrderProductResponse[];
}
