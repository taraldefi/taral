import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CompanyAddressEntity } from '../models/company.information.address.entity';
import { CompanyAddressRepository } from '../repositories/company.information.address.repository';

export const CompanyAddressEntityRepositoryToken =
  getRepositoryToken(CompanyAddressEntity);

export const AuctionBidHistoryEntityRepositoryProvider = {
  provide: CompanyAddressRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(CompanyAddressRepository),
  inject: [Connection],
};
