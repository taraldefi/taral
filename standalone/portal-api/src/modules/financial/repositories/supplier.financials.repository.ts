import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierFinancialInformationEntity } from '../models/supplier.financial.info.entity';

@EntityRepository(SupplierFinancialInformationEntity)
export class SupplierFinancialInformationsRepository extends BaseRepository<SupplierFinancialInformationEntity> {}
