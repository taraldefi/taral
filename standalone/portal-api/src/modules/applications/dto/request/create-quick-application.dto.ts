import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuickApplicationRequest {
  @ApiProperty({ example: 'verner_ullrich' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
