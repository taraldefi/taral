import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { CompanyEntity } from '../models/company.entity';
import { SupplierCompanyEntity } from '../models/supplier.company.entity';

@EntityRepository(SupplierCompanyEntity)
export class SupplierCompanyRepository extends BaseRepository<SupplierCompanyEntity> {}
