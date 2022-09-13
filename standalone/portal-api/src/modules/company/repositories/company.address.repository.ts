import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { CompanyAddressEntity } from '../models/company.address.entity';

@EntityRepository(CompanyAddressEntity)
export class CompanyAddressRepository extends BaseRepository<CompanyAddressEntity> {}
