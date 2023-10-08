import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
