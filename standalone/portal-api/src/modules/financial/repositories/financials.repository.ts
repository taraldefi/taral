import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { FinancialInformationEntity } from '../models/financial.info.entity';

@EntityRepository(FinancialInformationEntity)
export class FinancialsRepository extends BaseRepository<FinancialInformationEntity> {}