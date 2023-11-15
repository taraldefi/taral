import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { BuyerCompanyInformationEntity } from '../models/buyer.company.information.entity';

@EntityRepository(BuyerCompanyInformationEntity)
export class BuyerCompanyInformationRepository extends BaseRepository<BuyerCompanyInformationEntity> {}
