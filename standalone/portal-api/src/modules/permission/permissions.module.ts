import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionsService } from 'src/modules/permission/permissions.service';
import { PermissionsController } from 'src/modules/permission/permissions.controller';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionEntityRepositoryProvider } from './permission.repository.provider';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity]), AuthModule, LoggerModule],
  exports: [PermissionsService],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    UniqueValidatorPipe,
    PermissionEntityRepositoryProvider,
  ],
})
export class PermissionsModule {}
