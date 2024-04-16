import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';

@Entity({ name: 'orderProducts' })
export class OrderProductEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  name: string;

  @Column()
  @Allow()
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  @Allow()
  unitPrice: number;

  @ManyToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.products, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: OrderDetailEntity;
}
