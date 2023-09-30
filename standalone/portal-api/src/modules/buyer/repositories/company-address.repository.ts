import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { CompanyAddressEntity } from 'src/modules/company/models/company.address.entity';

@EntityRepository(CompanyAddressEntity)
export class CompanyAddressEntityRepository extends BaseRepository<CompanyAddressEntity> {}
