import { AfterInsert, AfterLoad, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Allow } from 'class-validator';

@Entity({
  name: 'email_templates'
})
export class EmailTemplateEntity extends CustomBaseEntity {


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

  @Column()
  @Index({
    unique: true
  })
  title: string;

  @Column()
  slug: string;

  @Column()
  sender: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column()
  isDefault: boolean;

  
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
}
