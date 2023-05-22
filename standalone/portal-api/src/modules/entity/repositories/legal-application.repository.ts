import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { LegalApplicationEntity } from '../models/legal-application.entity';

@EntityRepository(LegalApplicationEntity)
export class LegalApplicationRepository extends BaseRepository<LegalApplicationEntity> {}
