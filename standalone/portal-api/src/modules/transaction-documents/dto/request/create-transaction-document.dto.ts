import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFileDataDto } from 'src/modules/files/dto/create-file-data.dto';

export class CreateTransactionDocumentDto {
  @ApiProperty({
    description: 'Confirmation Document',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateFileDataDto)
  confirmationDocument: CreateFileDataDto;

  @ApiProperty({
    description: 'Additional Document',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateFileDataDto)
  additionalDocument: CreateFileDataDto;
}
