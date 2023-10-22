import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProductEntity } from '../models/order-product.entity';
import { BuyerQuickApplicationEntity } from 'src/modules/applications/models/buyer-quickapplication.entity';

@Entity({ name: 'order_details' })
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

  @OneToOne(
    () => BuyerQuickApplicationEntity,
    (application) => application.orderDetails,
  )
  application: BuyerQuickApplicationEntity;
}
