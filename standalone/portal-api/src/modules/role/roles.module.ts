import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from 'src/modules/role/roles.service';
import { RolesController } from 'src/modules/role/roles.controller';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PermissionsModule } from 'src/modules/permission/permissions.module';
import { RoleEntity } from './entities/role.entity';
import { RoleEntityRepositoryProvider } from './role.repository.provider';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    AuthModule,
    PermissionsModule,
    LoggerModule
  ],
  exports: [],
  controllers: [RolesController],
  providers: [RolesService, UniqueValidatorPipe, RoleEntityRepositoryProvider],
})
export class RolesModule {}
