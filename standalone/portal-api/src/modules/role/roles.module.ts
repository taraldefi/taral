import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from 'src/modules/role/roles.service';
import { RolesController } from 'src/modules/role/roles.controller';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PermissionsModule } from 'src/modules/permission/permissions.module';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    AuthModule,
    PermissionsModule
  ],
  exports: [],
  controllers: [RolesController],
  providers: [RolesService, UniqueValidatorPipe]
})
export class RolesModule {}
