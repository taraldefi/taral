import {
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Check,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export abstract class BaseHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Check(`"action" IN ('insert', 'update', 'delete')`)
  action: 'insert' | 'update' | 'delete';

  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Column('json', { default: {} })
  changes: any;

  @Column({ type: 'char', length: 64 })
  hash: string;

  @BeforeInsert()
  createTimestamp() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
