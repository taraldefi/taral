import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/modules/auctionhistory/services/base.service';
import { SupplierRepository } from '../repositories/supplier.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierCompanyEntityRepository } from '../repositories/supplier-company.repository';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { SupplierFinancialInformationEntity } from 'src/modules/financial/models/supplier.financial.info.entity';
import { SupplierFinancialInformationEntityRepository } from '../repositories/supplier-financial-information.repository';
import { CompanyTaxAndRevenueEntity } from 'src/modules/company/models/company.tax.and.revenue.entity';
import { CompanyTaxAndRevenueEntityRepository } from '../repositories/supplier-company-tax-and-revenue.repository';
import { SupplierRatingEntityRepository } from '../repositories/supplier-rating.repository';
import { SupplierRatingEntity } from 'src/modules/rating/models/supplier.rating.entity';
import { EntityMappingService } from './mapping.service';
import { triggerError } from 'src/common/trigger.error';
import { GetSupplierResponse } from '../dto/response/get-supplier-response.dto';
import { CreateSupplierRequest } from '../dto/request/create-supplier.dto';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { SupplierEntity } from '../models/supplier.entity';
import { CompanyAddressEntity } from 'src/modules/company/models/company.address.entity';
import { CompanyAddressEntityRepository } from 'src/modules/buyer/repositories/company-address.repository';
import { UpdateSupplierRequest } from '../dto/request/update-supplier.dto';

@Injectable()
export class SupplierService extends BaseService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: SupplierRepository,

    @InjectRepository(SupplierCompanyEntity)
    private supplierCompanyRepository: SupplierCompanyEntityRepository,

    @InjectRepository(SupplierFinancialInformationEntity)
    private supplierFinancialInformationRepository: SupplierFinancialInformationEntityRepository,

    @InjectRepository(CompanyTaxAndRevenueEntity)
    private companyTaxAndRevenueRepository: CompanyTaxAndRevenueEntityRepository,

    @InjectRepository(SupplierRatingEntity)
    private supplierRatingRepository: SupplierRatingEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressEntityRepository,

    private mappingService: EntityMappingService,
  ) {
    super();
  }

  public async deleteSupplier(id: string): Promise<void> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.supplierRepository.findOneOrFail({
      relations: [
        'relationshipWithBuyers',
        'company',
        'company.address',
        'financials',
        'rating',
      ],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    await this.supplierRepository.delete({ id: id });
  }

  public async getAll(): Promise<GetSupplierResponse[]> {
    const entities = await this.supplierRepository.find({
      relations: [
        'relationshipWithBuyers',
        'company',
        'company.address',
        'financials',
        'rating',
      ],
    });

    return this.mappingService.mapManyEntities(entities);
  }

  public async getEntity(id: string): Promise<GetSupplierResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.supplierRepository.findOne({
      relations: [
        'relationshipWithBuyers',
        'company',
        'company.address',
        'financials',
        'rating',
      ],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    return this.mappingService.mapEntityDetails(entity);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createEntity(data: CreateSupplierRequest) {
    const entity = new SupplierEntity();

    const company = new SupplierCompanyEntity();

    const address = new CompanyAddressEntity();

    company.address = address;
    entity.company = company;

    console.log(JSON.stringify(data, null, 2));

    entity.company.address.addressLine1 = data.company.address.addressLine1;
    entity.company.address.addressLine2 = data.company.address.addressLine2;
    entity.company.address.city = data.company.address.city;
    entity.company.address.postalCode = data.company.address.postalCode;

    var addressSavedResult = await this.companyAddressRepository.save(address);

    company.address = addressSavedResult;
    company.companyName = data.company.companyName;

    company.dateEstablished = data.company.dateEstablished;
    company.employeeCount = data.company.employeeCount;
    company.registrationNumbers = data.company.registrationNumbers;

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

    var companySavedResult = await this.supplierCompanyRepository.save(company);

    entity.company = companySavedResult;

    const financials = new SupplierFinancialInformationEntity();

    financials.turnover = data.financialInformation.turnover;
    financials.balanceSheetTotal = data.financialInformation.balanceSheetTotal;

    var financialsSavedResult =
      await this.supplierFinancialInformationRepository.save(financials);

    entity.financials = financialsSavedResult;

    const rating = new SupplierRatingEntity();
    rating.agencyName = data.rating.agencyName;
    rating.rating = data.rating.rating;
    rating.issuanceDate = data.rating.issuanceDate;

    var ratingSavedResult = await this.supplierRatingRepository.save(rating);

    entity.rating = ratingSavedResult;

    var entitySavedResult = await this.supplierRepository.save(entity);

    return entitySavedResult;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateEntity(
    id: string,
    data: UpdateSupplierRequest,
  ): Promise<GetSupplierResponse> {
    this.setupTransactionHooks();

    const entity = await this.supplierRepository.findOneOrFail({
      relations: [
        'relationshipWithBuyers',
        'company',
        'company.address',
        'financials',
        'rating',
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
      await this.companyAddressRepository.save(entity.company.address);
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

    if (data.company.registrationNumbers) {
      companyChanged = true;
      entity.company.registrationNumbers = data.company.registrationNumbers;
    }

    if (companyChanged) {
      await this.supplierCompanyRepository.save(entity.company);
    }

    let financialInformationChanged = false;

    if (data.financialInformation.turnover) {
      financialInformationChanged = true;
      entity.financials.turnover = data.financialInformation.turnover;
    }

    if (data.financialInformation.balanceSheetTotal) {
      financialInformationChanged = true;
      entity.financials.balanceSheetTotal =
        data.financialInformation.balanceSheetTotal;
    }

    if (financialInformationChanged) {
      await this.supplierFinancialInformationRepository.save(entity.financials);
    }

    let ratingChanged = false;

    if (data.rating.agencyName) {
      ratingChanged = true;
      entity.rating.agencyName = data.rating.agencyName;
    }

    if (data.rating.rating) {
      ratingChanged = true;
      entity.rating.rating = data.rating.rating;
    }

    if (data.rating.issuanceDate) {
      ratingChanged = true;
      entity.rating.issuanceDate = data.rating.issuanceDate;
    }

    if (ratingChanged) {
      await this.supplierRatingRepository.save(entity.rating);
    }

    var updatedEntity = await this.supplierRepository.save(entity);

    return this.mappingService.mapEntityDetails(updatedEntity);
  }
}
