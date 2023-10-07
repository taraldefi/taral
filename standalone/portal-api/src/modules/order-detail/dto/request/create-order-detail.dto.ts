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

  @ApiProperty({
    description: 'Application ID',
    example: '05159674-06ea-4bc2-b750-603b0f454025',
  })
  @IsNotEmpty()
  @IsString()
  applicationId: string;
}
