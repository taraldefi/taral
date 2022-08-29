import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { CompanyEntity } from '../models/company.entity';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends BaseRepository<CompanyEntity> {}
