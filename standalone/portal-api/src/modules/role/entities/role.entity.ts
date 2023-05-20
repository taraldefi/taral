import { Column, Entity, Index, JoinTable, ManyToMany, Unique } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';

@Entity({
  name: 'rolea'
})
export class RoleEntity extends CustomBaseEntity {
  
  @Column({
    type: 'text',
    unique: true
  })
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.role, {cascade: true})
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id'
    }
  })
  permission: PermissionEntity[];

  constructor(data?: Partial<RoleEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
