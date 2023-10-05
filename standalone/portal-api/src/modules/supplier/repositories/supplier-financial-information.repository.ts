import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierFinancialInformationEntity } from 'src/modules/financial/models/supplier.financial.info.entity';

@EntityRepository(SupplierFinancialInformationEntity)
export class SupplierFinancialInformationEntityRepository extends BaseRepository<SupplierFinancialInformationEntity> {}
