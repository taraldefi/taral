import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { RoleSerializer } from 'src/modules/role/serializer/role.serializer';
import { BaseRepository } from 'src/common/repository/base.repository';
import { CreateRoleDto } from 'src/modules/role/dto/create-role.dto';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { UpdateRoleDto } from 'src/modules/role/dto/update-role.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(RoleEntity)
export class RoleEntityRepository extends BaseRepository<
  RoleEntity,
  RoleSerializer
> {
  async store(
    createRoleDto: CreateRoleDto,
    permissions: PermissionEntity[],
  ): Promise<RoleSerializer> {
    const { name, description } = createRoleDto;
    const role = this.create();
    role.name = name;
    role.description = description;
    role.permission = permissions;
    await role.save();
    return this.transform(role);
  }

  async updateItem(
    role: RoleEntity,
    updateRoleDto: UpdateRoleDto,
    permission: PermissionEntity[],
  ): Promise<RoleSerializer> {
    const fields = ['name', 'description'];
    for (const field of fields) {
      if (updateRoleDto[field]) {
        role[field] = updateRoleDto[field];
      }
    }
    if (permission && permission.length > 0) {
      role.permission = permission;
    }
    await role.save();
    return this.transform(role);
  }

  /**
   * transform single role
   * @param model
   * @param transformOption
   */
  transform(model: RoleEntity, transformOption = {}): RoleSerializer {
    return plainToClass(
      RoleSerializer,
      classToPlain(model, transformOption),
      transformOption,
    );
  }

  /**
   * transform array of roles
   * @param models
   * @param transformOption
   */
  transformMany(models: RoleEntity[], transformOption = {}): RoleSerializer[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
