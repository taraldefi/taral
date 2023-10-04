import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { CreateFileResponse } from 'src/modules/files/dto/create-file-response.dto';

export class CreateTxDocResponse {
  @IsUUID()
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty({
    description: 'Confirmation Document',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateFileResponse)
  confirmationDocument: CreateFileResponse;

  @ApiProperty({
    description: 'Additional Document',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateFileResponse)
  additionalDocument: CreateFileResponse;
}
