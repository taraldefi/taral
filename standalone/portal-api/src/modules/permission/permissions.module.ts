import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionsService } from 'src/modules/permission/permissions.service';
import { PermissionsController } from 'src/modules/permission/permissions.controller';
import { PermissionRepository } from 'src/modules/permission/permission.repository';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository]), AuthModule],
  exports: [PermissionsService],
  controllers: [PermissionsController],
  providers: [PermissionsService, UniqueValidatorPipe]
})
export class PermissionsModule {}