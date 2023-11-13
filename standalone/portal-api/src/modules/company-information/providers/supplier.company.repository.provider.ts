import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SupplierCompanyRepository } from '../repositories/supplier.company.repository';
import { SupplierCompanyInformationEntity } from '../models/supplier.company.information.entity';

export const SupplierCompanyEntityRepositoryToken = getRepositoryToken(
  SupplierCompanyInformationEntity,
);

export const AuctionBidHistoryEntityRepositoryProvider = {
  provide: SupplierCompanyRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(SupplierCompanyRepository),
  inject: [Connection],
};
