import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from '@modules/multipart';
import { Type } from 'class-transformer';
import { CreateSupplierCompanyTaxAndRevenueRequest } from 'src/modules/company-information/dto/request/supplier/create-supplier-company-tax-and-revenue.dto';
import { CreateSupplierCompanyAddressRequest } from 'src/modules/company-information/dto/request/supplier/create-supplier-company-address.dto';

export class UpdateSupplierEntityDto {
  @IsFile()
  @MaxFileSize(100e6)
  @HasMimeType(['image/png'])
  @ApiProperty({
    example: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  @IsOptional()
  logo: MemoryStoredFile;

  @ApiProperty({ example: 'Engelbrecht Ltd' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'John Smith' })
  @IsNotEmpty()
  @IsString()
  beneficialOwner: string;

  @ApiProperty({ example: '55-NB' })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @ApiProperty({ example: 'German' })
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @ApiProperty({ example: 'Berlin' })
  @IsNotEmpty()
  @IsString()
  headquarters: string;

  @ApiProperty({ example: 'Information Technology' })
  @IsNotEmpty()
  @IsString()
  industryType: string;

  @ApiProperty({ example: 'Software Development' })
  @IsNotEmpty()
  @IsString()
  coreBusiness: string;

  @ApiProperty({ example: '12-12-2022' })
  @IsNotEmpty()
  @IsDateString()
  incorporationDate: Date;

  @ApiProperty({ example: 'Limited' })
  @IsNotEmpty()
  @IsString()
  legalForm: string;

  @ApiProperty({ example: '1234567891' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '1' })
  @IsOptional()
  @IsNumber()
  employeeCount?: number;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateSupplierCompanyTaxAndRevenueRequest)
  taxAndRevenue?: CreateSupplierCompanyTaxAndRevenueRequest;

  @ValidateNested()
  @Type(() => CreateSupplierCompanyAddressRequest)
  address: CreateSupplierCompanyAddressRequest;
}
