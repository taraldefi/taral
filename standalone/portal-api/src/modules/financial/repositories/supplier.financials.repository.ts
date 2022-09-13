import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { SupplierFinancialInformationEntity } from '../models/supplier.financial.info.entity';

@EntityRepository(SupplierFinancialInformationEntity)
export class SupplierFinancialInformationsRepository extends BaseRepository<SupplierFinancialInformationEntity> {}
