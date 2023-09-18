import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProductEntity } from '../models/order-product.entity';

@Entity({ name: 'orderDetails' })
export class OrderDetailEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  importPort: string;

  @Column()
  @Allow()
  exportPort: string;

  @OneToMany(() => OrderProductEntity, (product) => product.order)
  products: OrderProductEntity[];
}
