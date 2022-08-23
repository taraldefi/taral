import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from '@modules/multipart';

export class UpdateEntityDto {

    @ApiProperty({ example: 'Engelbrecht Ltd' })
    @IsString()
    name?: string;

    @ApiProperty({ example: 'John Smith' })
    @IsNotEmpty()
    @IsString()
    beneficialOwner?: string;

    @ApiProperty({ example: '55-NB' })
    @IsNotEmpty()
    @IsString()
    abbreviation?: string;

    @ApiProperty({ example: 'German' })
    @IsNotEmpty()
    @IsString()
    nationality?: string;

    @ApiProperty({ example: 'Berlin' })
    @IsNotEmpty()
    @IsString()
    headquaters?: string;

    @ApiProperty({ example: 'Information Technology' })
    @IsNotEmpty()
    @IsString()
    industryType?: string;

    @ApiProperty({ example: 'Software Development' })
    @IsNotEmpty()
    @IsString()
    coreBusiness?: string;

    @ApiProperty({ example: '12-12-2022' })
    @IsNotEmpty()
    @IsDateString()
    incorporationDate?: Date;

    @ApiProperty({ example: 'Limited' })
    @IsNotEmpty()
    @IsString()
    legalForm?: string;
  }
  