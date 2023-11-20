import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierCompanyInformationEntity } from '../models/supplier.company.information.entity';

@EntityRepository(SupplierCompanyInformationEntity)
export class SupplierCompanyInformationRepository extends BaseRepository<SupplierCompanyInformationEntity> {}
