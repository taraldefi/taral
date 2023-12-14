import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTxDocResponse {
  @IsUUID()
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({
    description: 'Confirmation Document',
  })
  @IsNotEmpty()
  confirmationDocument: boolean;

  @ApiProperty({
    description: 'Additional Document',
  })
  @IsNotEmpty()
  additionalDocument: boolean;
}
