import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { PaymentTermEntity } from '../models/payment-term.entity';

@EntityRepository(PaymentTermEntity)
export class PaymentTermRepository extends BaseRepository<PaymentTermEntity> {}
