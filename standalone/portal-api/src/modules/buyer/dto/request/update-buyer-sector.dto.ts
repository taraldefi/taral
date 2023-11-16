import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CompanyStatus } from 'src/modules/sectors/enums/company.status.enum';
import { CompanyType } from 'src/modules/sectors/enums/company.type.enum';

export class UpdateBuyerSectorRequest {
  @ApiProperty({ example: 'IT Industry' })
  @IsNotEmpty()
  @IsString()
  industryType: string;

  @ApiProperty({ example: 'public' })
  @IsNotEmpty()
  @IsEnum(CompanyType)
  type: CompanyType;

  @ApiProperty({ example: 'subsidiary' })
  @IsNotEmpty()
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
}
