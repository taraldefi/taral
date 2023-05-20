import { Optional } from '@nestjs/common';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { CreatePermissionDto } from 'src/modules/permission/dto/create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiPropertyOptional()
  @Optional()
  @IsString()
  description: string;
}
