import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Coffee',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'quantity of the product',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'unit price of the product',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({
    description: 'The ID of the order',
    example: '05159674-06ea-4bc2-b750-603b0f454025',
  })
  @IsNotEmpty()
  orderId: string;
}
