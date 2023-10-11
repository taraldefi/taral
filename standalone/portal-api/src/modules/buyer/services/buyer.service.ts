import { Injectable } from '@nestjs/common';
import { BuyerEntityRepository } from '../repositories/buyer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyerEntity } from '../models/buyer.entity';
import { triggerError } from 'src/common/trigger.error';
import { GetBuyerResponse } from '../dto/response/get-buyer-response.dto';
import { EntityMappingService } from './mapping.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { CreateBuyerRequest } from '../dto/request/create-buyer.dto';
import { BaseService } from 'src/modules/auctionhistory/services/base.service';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { CompanyAddressEntity } from 'src/modules/company/models/company.address.entity';
import { BuyerCompanyEntityRepository } from '../repositories/buyer-company.repository';
import { SectorEntityRepository } from '../repositories/sector.repository';
import { CompanyAddressEntityRepository } from '../repositories/company-address.repository';
import { SectorEntity } from 'src/modules/sectors/models/sector.entity';
import { UpdateBuyerRequest } from '../dto/request/update-buyer.dto';
import { CompanyTaxAndRevenueEntity } from 'src/modules/company/models/company.tax.and.revenue.entity';
import { CompanyTaxAndRevenueEntityRepository } from 'src/modules/supplier/repositories/supplier-company-tax-and-revenue.repository';

@Injectable()
export class BuyerService extends BaseService {
  constructor(
    @InjectRepository(BuyerEntity)
    private buyerEntityRepository: BuyerEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressEntityRepository,

    @InjectRepository(CompanyTaxAndRevenueEntity)
    private companyTaxAndRevenueRepository: CompanyTaxAndRevenueEntityRepository,

    @InjectRepository(BuyerCompanyEntity)
    private buyerCompanyRepository: BuyerCompanyEntityRepository,

    @InjectRepository(SectorEntity)
    private sectorEntityRepository: SectorEntityRepository,

    private mappingService: EntityMappingService,
  ) {
    super();
  }

  public async deleteBuyer(id: string): Promise<void> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOneOrFail({
      relations: ['relationshipWithSuppliers'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    await this.buyerEntityRepository.delete({ id: id });
  }

  public async getEntity(id: string): Promise<BuyerEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOne({
      relations: [
        'relationshipWithSuppliers',
        'sector',
        'company',
        'company.address',
        'company.taxAndRevenue',
      ],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    return entity;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createEntity(data: CreateBuyerRequest): Promise<BuyerEntity> {
    this.setupTransactionHooks();

    const entity = new BuyerEntity();
    const company = new BuyerCompanyEntity();
    const address = new CompanyAddressEntity();

    company.address = address;
    entity.company = company;

    entity.company.address.addressLine1 = data.company.address.addressLine1;
    entity.company.address.addressLine2 = data.company.address.addressLine2;
    entity.company.address.city = data.company.address.city;
    entity.company.address.postalCode = data.company.address.postalCode;

    var addressSavedResult = await this.companyAddressRepository.save(address);

    company.address = addressSavedResult;
    company.companyName = data.company.companyName;
    company.dateEstablished = data.company.dateEstablished;
    company.phoneNumber = data.company.phoneNumber;
    company.employeeCount = data.company.employeeCount;
    company.registrationNumbers = data.company.registrationNumbers;

    if (data.company.taxAndRevenue) {
      const taxAndRevenue = new CompanyTaxAndRevenueEntity();
      taxAndRevenue.audited = data.company.taxAndRevenue.audited;
      taxAndRevenue.taxNumber = data.company.taxAndRevenue.taxNumber;
      taxAndRevenue.exportRevenuePercentage =
        data.company.taxAndRevenue.exportRevenuePercentage;
      taxAndRevenue.exportValue = data.company.taxAndRevenue.exportValue;
      taxAndRevenue.lastFiscalYear = data.company.taxAndRevenue.lastFiscalYear;
      taxAndRevenue.totalRevenue = data.company.taxAndRevenue.totalRevenue;
      var taxAndRevenueSavedResult =
        await this.companyTaxAndRevenueRepository.save(taxAndRevenue);

      company.taxAndRevenue = taxAndRevenueSavedResult;
    }

    var companySavedResult = await this.buyerCompanyRepository.save(company);
    entity.company = companySavedResult;
    if (data.sector) {
      const sector = new SectorEntity();
      sector.industryType = data.sector.industryType;
      sector.status = data.sector.status;

      var sectorSavedResult = await this.sectorEntityRepository.save(sector);
      entity.sector = sectorSavedResult;
    }

    var entitySavedResult = await this.buyerEntityRepository.save(entity);

    return entitySavedResult;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateEntity(
    id: string,
    data: UpdateBuyerRequest,
  ): Promise<BuyerEntity> {
    this.setupTransactionHooks();

    const entity = await this.buyerEntityRepository.findOneOrFail({
      relations: [
        'relationshipWithSuppliers',
        'sector',
        'company',
        'company.address',
        'company.taxAndRevenue',
      ],
      where: { id: id },
      loadEagerRelations: true,
    });

    if (!entity) throw triggerError('entity-not-found');

    let companyAddressChanged = false;

    if (data.company.address.addressLine1) {
      companyAddressChanged = true;
      entity.company.address.addressLine1 = data.company.address.addressLine1;
    }

    if (data.company.address.addressLine2) {
      companyAddressChanged = true;
      entity.company.address.addressLine2 = data.company.address.addressLine2;
    }

    if (data.company.address.city) {
      companyAddressChanged = true;
      entity.company.address.city = data.company.address.city;
    }

    if (data.company.address.postalCode) {
      companyAddressChanged = true;
      entity.company.address.postalCode = data.company.address.postalCode;
    }

    if (companyAddressChanged) {
      var addressSavedResult = await this.companyAddressRepository.save(
        entity.company.address,
      );
      entity.company.address = addressSavedResult;
    }

    let taxAndRevenueChanged = false;
    if (data.company.taxAndRevenue.taxNumber) {
      taxAndRevenueChanged = true;
      entity.company.taxAndRevenue.taxNumber =
        data.company.taxAndRevenue.taxNumber;
    }
    if (data.company.taxAndRevenue.audited) {
      taxAndRevenueChanged = true;
      entity.company.taxAndRevenue.audited = data.company.taxAndRevenue.audited;
    }
    if (data.company.taxAndRevenue.exportRevenuePercentage) {
      taxAndRevenueChanged = true;
      entity.company.taxAndRevenue.exportRevenuePercentage =
        data.company.taxAndRevenue.exportRevenuePercentage;
    }
    if (data.company.taxAndRevenue.exportValue) {
      taxAndRevenueChanged = true;
      entity.company.taxAndRevenue.exportValue =
        data.company.taxAndRevenue.exportValue;
    }
    if (data.company.taxAndRevenue.lastFiscalYear) {
      taxAndRevenueChanged = true;
      entity.company.taxAndRevenue.lastFiscalYear =
        data.company.taxAndRevenue.lastFiscalYear;
    }
    if (data.company.taxAndRevenue.totalRevenue) {
      taxAndRevenueChanged = true;
      entity.company.taxAndRevenue.totalRevenue =
        data.company.taxAndRevenue.totalRevenue;
    }
    if (taxAndRevenueChanged) {
      var taxAndRevenueSavedResult =
        await this.companyTaxAndRevenueRepository.save(
          entity.company.taxAndRevenue,
        );
      entity.company.taxAndRevenue = taxAndRevenueSavedResult;
    }

    let companyChanged = false;

    if (data.company.companyName) {
      companyChanged = true;
      entity.company.companyName = data.company.companyName;
    }

    if (data.company.dateEstablished) {
      companyChanged = true;
      entity.company.dateEstablished = data.company.dateEstablished;
    }

    if (data.company.employeeCount) {
      companyChanged = true;
      entity.company.employeeCount = data.company.employeeCount;
    }

    if (data.company.phoneNumber) {
      companyChanged = true;
      entity.company.phoneNumber = data.company.phoneNumber;
    }
    if (data.company.registrationNumbers) {
      companyChanged = true;
      entity.company.registrationNumbers = data.company.registrationNumbers;
    }

    if (companyChanged) {
      var companySavedResult = await this.buyerCompanyRepository.save(
        entity.company,
      );
      entity.company = companySavedResult;
    }

    let sectorChanged = false;
    if (data.sector) {
      if (data.sector.industryType) {
        sectorChanged = true;
        entity.sector.industryType = data.sector.industryType;
      }

      if (data.sector.status) {
        sectorChanged = true;
        entity.sector.status = data.sector.status;
      }
    }

    if (sectorChanged) {
      var sectorSavedResult = await this.sectorEntityRepository.save(
        entity.sector,
      );
      entity.sector = sectorSavedResult;
    }

    var updatedEntity = await this.buyerEntityRepository.save(entity);

    return updatedEntity;
  }

  public async getAll(): Promise<GetBuyerResponse[]> {
    const entities = await this.buyerEntityRepository.find({
      relations: [
        'relationshipWithSuppliers',
        'sector',
        'company',
        'company.address',
      ],
    });

    return this.mappingService.mapManyEntities(entities);
  }
}
