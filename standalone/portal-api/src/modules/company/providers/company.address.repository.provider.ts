import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CompanyAddressEntity } from '../models/company.address.entity';
import { CompanyAddressRepository } from '../repositories/company.address.repository';

export const CompanyAddressEntityRepositoryToken =
  getRepositoryToken(CompanyAddressEntity);

export const AuctionBidHistoryEntityRepositoryProvider = {
  provide: CompanyAddressRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(CompanyAddressRepository),
  inject: [Connection],
};
