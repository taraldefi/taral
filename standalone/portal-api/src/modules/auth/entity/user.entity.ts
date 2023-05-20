import {
  AfterInsert,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { UserStatusEnum } from 'src/modules/auth/user-status.enum';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { Allow } from 'class-validator';

/**
 * User Entity
 */
@Entity({
  name: 'user'
})
export class UserEntity extends CustomBaseEntity {


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

  @Index({
    unique: true
  })
  @Column()
  username: string;

  @Index({
    unique: true
  })
  @Column()
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true
  })
  password: string;

  @Index()
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  avatar: string;

  @Column()
  status: UserStatusEnum;

  @Column()
  @Exclude({
    toPlainOnly: true
  })
  token: string;

  // @CreateDateColumn({
  //   type: 'timestamp with time zone',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  tokenValidityDate: Date;

  @Column()
  @Exclude({
    toPlainOnly: true
  })
  salt: string;

  @Column({
    nullable: true
  })
  @Exclude({
    toPlainOnly: true
  })
  twoFASecret?: string;

  @Exclude({
    toPlainOnly: true
  })
  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP'
  // })
  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  twoFAThrottleTime?: Date;

  @Column({
    default: false
  })
  isTwoFAEnabled: boolean;

  @Exclude({
    toPlainOnly: true
  })
  skipHashPassword = false;

  // @OneToOne(() => RoleEntity)
  // @JoinColumn()
  // role: RoleEntity;

  // @Column()
  // roleId: number;

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

  @AfterLoad()
  @AfterInsert()
  updateData() {
    if (this.createdAt == undefined) {
      this.createdAt = new Date();
    }

    if (this.twoFAThrottleTime == undefined) {
      this.twoFAThrottleTime = new Date();
    }

    if (this.tokenValidityDate == undefined) {
      this.tokenValidityDate = new Date();
    }

    if (this.updatedAt == undefined) {
      this.updatedAt = new Date();
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
