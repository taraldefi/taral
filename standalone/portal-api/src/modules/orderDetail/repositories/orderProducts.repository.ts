import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { OrderProductEntity } from '../models/orderProducts.entity';

@EntityRepository(OrderProductEntity)
export class OrderProductsRepository extends BaseRepository<OrderProductEntity> {}
