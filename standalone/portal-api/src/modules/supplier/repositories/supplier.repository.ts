import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { SupplierEntity } from '../models/supplier.entity';

@EntityRepository(SupplierEntity)
export class SupliersRepository extends BaseRepository<SupplierEntity> {}