import { AfterInsert, AfterLoad, ChildEntity, Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { Allow } from 'class-validator';

@Entity('role')
export class RoleEntity extends CustomBaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // // @CreateDateColumn({
  // //   type: 'timestamp',
  // //   default: () => 'CURRENT_TIMESTAMP'
  // // })
  // @Column({ type: 'timestamptz' }) // Recommended
  // @Allow()
  // createdAt: Date;

  // // @UpdateDateColumn({
  // //   type: 'timestamp',
  // //   default: () => 'CURRENT_TIMESTAMP',
  // //   onUpdate: 'CURRENT_TIMESTAMP'
  // // })
  // @Column({ type: 'timestamptz' }) // Recommended
  // @Allow()
  // updatedAt: Date;

  // @Column()
  // // @Index({
  // //   unique: true
  // // })
  // name: string;

  // @Column()
  // description: string;

  // @ManyToMany(() => PermissionEntity, (permission) => permission.role)
  // @JoinTable({
  //   name: 'role_permission',
  //   joinColumn: {
  //     name: 'roleId',
  //     referencedColumnName: 'id'
  //   },
  //   inverseJoinColumn: {
  //     name: 'permissionId',
  //     referencedColumnName: 'id'
  //   }
  // })

  @ManyToMany(
    () => PermissionEntity,
    (permissionEntity) => permissionEntity.role,
  )
  permission: PermissionEntity[];

  @AfterLoad()
  @AfterInsert()
  updateData() {
    // if (this.createdAt == undefined) {
    //   this.createdAt = new Date();
    // }

    // if (this.updatedAt == undefined) {
    //   this.updatedAt = new Date();
    // }
  }

  constructor(data?: Partial<RoleEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
