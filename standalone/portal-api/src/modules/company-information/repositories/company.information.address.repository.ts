import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { CompanyAddressEntity } from '../models/company.information.address.entity';

@EntityRepository(CompanyAddressEntity)
export class CompanyAddressRepository extends BaseRepository<CompanyAddressEntity> {}
