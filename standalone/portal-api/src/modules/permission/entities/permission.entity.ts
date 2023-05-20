import { AfterInsert, AfterLoad, Column, CreateDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Allow } from 'class-validator';

@Entity({
  name: 'permission'
})
@Unique(['description'])
export class PermissionEntity extends CustomBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP'
  // })
  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  createdAt: Date;

  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP'
  // })
  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  updatedAt: Date;

  @Column('varchar', { length: 100 })
  resource: string;

  @Column()
  @Index({
    unique: true
  })
  description: string;

  @Column()
  path: string;

  @Column('varchar', {
    default: 'get',
    length: 20
  })
  method: string;

  @Column()
  isDefault: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(() => RoleEntity, (role) => role.permission, { cascade: true })
  role: RoleEntity[];

  @AfterLoad()
  @AfterInsert()
  updateData() {
    if (this.createdAt == undefined) {
      this.createdAt = new Date();
    }

    if (this.updatedAt == undefined) {
      this.updatedAt = new Date();
    }
  }


  constructor(data?: Partial<PermissionEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
