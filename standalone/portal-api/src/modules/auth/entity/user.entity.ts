import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { UserStatusEnum } from 'src/modules/auth/user-status.enum';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';

/**
 * User Entity
 */
@Entity('users')
export class UserEntity extends CustomBaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  status: UserStatusEnum;

  @Column({ nullable: true })
  @Exclude({
    toPlainOnly: true,
  })
  token: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  tokenValidityDate: Date;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  salt: string;

  @Column({
    nullable: true,
  })
  @Exclude({
    toPlainOnly: true,
  })
  twoFASecret?: string;

  @Exclude({
    toPlainOnly: true,
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  twoFAThrottleTime?: Date;

  @Column({
    default: false,
  })
  isTwoFAEnabled: boolean;

  @Exclude({
    toPlainOnly: true,
  })
  skipHashPassword = false;

  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  role: RoleEntity;

  @Column()
  roleId: number;

  @OneToMany(() => BuyerCompanyEntity, (buyerEntity) => buyerEntity.user)
  buyerEntities: BuyerCompanyEntity[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}
