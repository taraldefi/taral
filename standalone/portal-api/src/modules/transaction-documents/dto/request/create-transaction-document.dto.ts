import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateTxDocDto {
  @ApiProperty({
    description: 'Confirmation Document',
  })
  @IsOptional()
  confirmationDocument: boolean;

  @ApiProperty({
    description: 'Additional Document',
  })
  @IsOptional()
  additionalDocument: boolean;
}
