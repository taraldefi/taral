import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SupplierCompanyRepository } from '../repositories/supplier.company.repository';
import { SupplierCompanyEntity } from '../models/supplier.company.entity';

export const SupplierCompanyEntityRepositoryToken = getRepositoryToken(
    SupplierCompanyEntity,
);

export const AuctionBidHistoryEntityRepositoryProvider = {
  provide: SupplierCompanyRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(SupplierCompanyRepository),
  inject: [Connection],
};
