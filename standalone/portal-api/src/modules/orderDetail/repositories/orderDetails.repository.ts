import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { OrderDetailEntity } from '../models/orderDetail.entity';

@EntityRepository(OrderDetailEntity)
export class OrderDetailsRepository extends BaseRepository<OrderDetailEntity> {}
