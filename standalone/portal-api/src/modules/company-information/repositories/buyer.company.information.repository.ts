import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { BuyerCompanyInformationEntity } from '../models/buyer.company.information.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(BuyerCompanyInformationEntity)
export class BuyerCompanyInformationRepository extends BaseRepository<BuyerCompanyInformationEntity> {}
