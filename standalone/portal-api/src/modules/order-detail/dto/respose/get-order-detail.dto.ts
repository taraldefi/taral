import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GetOrderProductResponse } from './get-order-product.dto';

export class GetOrderDetailsResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({
    description: 'Port of import',
  })
  @IsNotEmpty()
  @IsString()
  importPort: string;

  @ApiProperty({
    description: 'Port of export',
  })
  @IsNotEmpty()
  @IsString()
  exportPort: string;

  @ApiProperty({
    example: {
      id: '05159674-06ea-4bc2-b750-603b0f454025',
      name: 'Product Title',
      quantity: 5,
      unitPrice: 10,
    },
  })
  products: GetOrderProductResponse[];
}
