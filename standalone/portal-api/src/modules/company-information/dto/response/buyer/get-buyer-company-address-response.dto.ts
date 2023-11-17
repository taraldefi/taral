import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetBuyerCompanyAddressRequest {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({ example: 'Petrosani' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '1st Street of Swagger' })
  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @ApiProperty({ example: '2nd Street of Swagger' })
  @IsNotEmpty()
  @IsString()
  addressLine2: string;

  @ApiProperty({ example: '123ABC' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;
}
