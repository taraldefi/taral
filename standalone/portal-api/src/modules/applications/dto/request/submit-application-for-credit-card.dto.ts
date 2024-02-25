import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitApplicationForCreditCardRequest {
  @ApiProperty({ example: 'Renaund A.Z' })
  @IsNotEmpty()
  @IsString()
  entityName: string;

  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  @IsNotEmpty()
  @IsString()
  entityId: string;
}
