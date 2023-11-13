import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { CompanyAddressEntity } from 'src/modules/company-information/models/companyinformation.address.entity';

@EntityRepository(CompanyAddressEntity)
export class CompanyAddressEntityRepository extends BaseRepository<CompanyAddressEntity> {}
