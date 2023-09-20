import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';
import { Type } from 'class-transformer';

export class CreateOrderDetailDto {
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

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];
}
