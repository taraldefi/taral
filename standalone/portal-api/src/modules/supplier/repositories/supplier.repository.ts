import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierEntity } from '../models/supplier.entity';

@EntityRepository(SupplierEntity)
export class SupliersRepository extends BaseRepository<SupplierEntity> {}
