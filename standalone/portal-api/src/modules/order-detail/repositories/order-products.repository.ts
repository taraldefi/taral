import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { OrderProductEntity } from '../models/order-product.entity';

@EntityRepository(OrderProductEntity)
export class OrderProductsRepository extends BaseRepository<OrderProductEntity> {}
