import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { CompanyAddressEntity } from '../models/company.information.address.entity';
import { CompanyAddressRepository } from '../repositories/company.information.address.repository';
import { CompanyTaxAndRevenueEntity } from '../models/company.information.tax.and.revenue.entity';
import { BuyerCompanyInformationEntity } from '../models/buyer.company.information.entity';
import { BuyerCompanyInformationRepository } from '../repositories/buyer.company.information.repository';
import { SectorEntity } from 'src/modules/sectors/models/sector.entity';
import { BuyerCompanyEntityService } from 'src/modules/company/services/buyer-entity.service';
import { EntityMappingService } from './mapping.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { CreateBuyerCompanyRequest } from '../dto/request/buyer/create-buyer-company.dto';
import { GetBuyerResponse } from '../dto/response/buyer/get-buyer-response.dto';
import { EntityNotFoundError } from 'typeorm';
import { triggerError } from 'src/common/trigger.error';
import { UpdateBuyerCompanyRequest } from '../dto/request/buyer/update-buyer-company.dto';
import { SectorsRepository } from 'src/modules/sectors/repositories/sectors.repository';
import { CompanyTaxAndRevenueRepository } from '../repositories/company.information.tax.and.revenue.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BuyerInformationService extends BaseService {
  constructor(
    public configService: ConfigService,

    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressRepository,

    @InjectRepository(CompanyTaxAndRevenueEntity)
    private companyTaxAndRevenueRepository: CompanyTaxAndRevenueRepository,

    @InjectRepository(BuyerCompanyInformationEntity)
    private buyerCompanyInformationRepository: BuyerCompanyInformationRepository,

    @InjectRepository(SectorEntity)
    private sectorEntityRepository: SectorsRepository,

    private readonly buyerCompanyService: BuyerCompanyEntityService,
    private readonly buyerInformationMappingService: EntityMappingService,
  ) {
    super(configService);
  }

  public async get(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
    );

    const buyer = await this.buyerCompanyService.findBuyerEntityById(
      application.company.id,
    );

    return this.buyerInformationMappingService.mapEntityDetails(buyer);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async create(
    data: CreateBuyerCompanyRequest,
    applicationId: string,
  ): Promise<GetBuyerResponse> {
    this.setupTransactionHooks();

    let application: QuickApplicationEntity = undefined;

    try {
      application = await this.buyerApplicationRepository.findOne(
        applicationId,
        {
          relations: [
            'paymentTerms',
            'orderDetails',
            'security',
            'transactionDocuments',
          ],
        },
      );
    } catch (exception) {
      throw new EntityNotFoundError('BuyerQuickApplicationEntity', {
        where: {
          id: applicationId,
        },
      });
    }

    console.log(application);
    // get the buyer company to fill in the buyer company information
    const entity = await this.buyerCompanyService.findBuyerEntityById(
      application.company.id,
    );

    // create a new instance of the buyer company information
    const companyInformation = new BuyerCompanyInformationEntity();
    const address = new CompanyAddressEntity();

    companyInformation.address = address;
    entity.companyInformation = companyInformation;

    entity.companyInformation.address.addressLine1 = data.address.addressLine1;
    entity.companyInformation.address.addressLine2 = data.address.addressLine2;
    entity.companyInformation.address.city = data.address.city;
    entity.companyInformation.address.postalCode = data.address.postalCode;

    var addressSavedResult = await this.companyAddressRepository.save(address);

    companyInformation.address = addressSavedResult;
    companyInformation.phoneNumber = data.phoneNumber;
    companyInformation.employeeCount = data.employeeCount;
    companyInformation.registrationNumbers = data.registrationNumbers;

    if (data.taxAndRevenue) {
      const taxAndRevenue = new CompanyTaxAndRevenueEntity();
      taxAndRevenue.audited = data.taxAndRevenue.audited;
      taxAndRevenue.taxNumber = data.taxAndRevenue.taxNumber;
      taxAndRevenue.exportRevenuePercentage =
        data.taxAndRevenue.exportRevenuePercentage;
      taxAndRevenue.exportValue = data.taxAndRevenue.exportValue;
      taxAndRevenue.lastFiscalYear = data.taxAndRevenue.lastFiscalYear;
      taxAndRevenue.totalRevenue = data.taxAndRevenue.totalRevenue;
      var taxAndRevenueSavedResult =
        await this.companyTaxAndRevenueRepository.save(taxAndRevenue);

      companyInformation.taxAndRevenue = taxAndRevenueSavedResult;
    }

    var companySavedResult = await this.buyerCompanyInformationRepository.save(
      companyInformation,
    );
    entity.companyInformation = companySavedResult;
    // if (data.sector) {
    //   const sector = new SectorEntity();
    //   sector.industryType = data.sector.industryType;
    //   sector.status = data.sector.status;

    //   var sectorSavedResult = await this.sectorEntityRepository.save(sector);
    //   entity.sector = sectorSavedResult;
    // }
    entity.save();

    await application.save();

    return this.buyerInformationMappingService.mapEntityDetails(entity);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async update(
    data: UpdateBuyerCompanyRequest,
    applicationId: string,
  ): Promise<GetBuyerResponse> {
    this.setupTransactionHooks();
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
    );
    const entity = await this.buyerCompanyService.findBuyerEntityById(
      application.company.id,
    );

    if (!entity) throw triggerError('entity-not-found');

    let companyAddressChanged = false;

    if (data.address.addressLine1) {
      companyAddressChanged = true;
      entity.companyInformation.address.addressLine1 =
        data.address.addressLine1;
    }

    if (data.address.addressLine2) {
      companyAddressChanged = true;
      entity.companyInformation.address.addressLine2 =
        data.address.addressLine2;
    }

    if (data.address.city) {
      companyAddressChanged = true;
      entity.companyInformation.address.city = data.address.city;
    }

    if (data.address.postalCode) {
      companyAddressChanged = true;
      entity.companyInformation.address.postalCode = data.address.postalCode;
    }

    if (companyAddressChanged) {
      var addressSavedResult = await this.companyAddressRepository.save(
        entity.companyInformation.address,
      );
      entity.companyInformation.address = addressSavedResult;
    }

    let taxAndRevenueChanged = false;
    if (data.taxAndRevenue.taxNumber) {
      taxAndRevenueChanged = true;
      entity.companyInformation.taxAndRevenue.taxNumber =
        data.taxAndRevenue.taxNumber;
    }
    if (data.taxAndRevenue.audited) {
      taxAndRevenueChanged = true;
      entity.companyInformation.taxAndRevenue.audited =
        data.taxAndRevenue.audited;
    }
    if (data.taxAndRevenue.exportRevenuePercentage) {
      taxAndRevenueChanged = true;
      entity.companyInformation.taxAndRevenue.exportRevenuePercentage =
        data.taxAndRevenue.exportRevenuePercentage;
    }
    if (data.taxAndRevenue.exportValue) {
      taxAndRevenueChanged = true;
      entity.companyInformation.taxAndRevenue.exportValue =
        data.taxAndRevenue.exportValue;
    }
    if (data.taxAndRevenue.lastFiscalYear) {
      taxAndRevenueChanged = true;
      entity.companyInformation.taxAndRevenue.lastFiscalYear =
        data.taxAndRevenue.lastFiscalYear;
    }
    if (data.taxAndRevenue.totalRevenue) {
      taxAndRevenueChanged = true;
      entity.companyInformation.taxAndRevenue.totalRevenue =
        data.taxAndRevenue.totalRevenue;
    }
    if (taxAndRevenueChanged) {
      var taxAndRevenueSavedResult =
        await this.companyTaxAndRevenueRepository.save(
          entity.companyInformation.taxAndRevenue,
        );
      entity.companyInformation.taxAndRevenue = taxAndRevenueSavedResult;
    }

    let companyChanged = false;

    if (data.employeeCount) {
      companyChanged = true;
      entity.companyInformation.employeeCount = data.employeeCount;
    }

    if (data.phoneNumber) {
      companyChanged = true;
      entity.companyInformation.phoneNumber = data.phoneNumber;
    }
    if (data.registrationNumbers) {
      companyChanged = true;
      entity.companyInformation.registrationNumbers = data.registrationNumbers;
    }

    if (companyChanged) {
      var companySavedResult =
        await this.buyerCompanyInformationRepository.save(
          entity.companyInformation,
        );
      entity.companyInformation = companySavedResult;
    }

    // let sectorChanged = false;
    // if (data.sector) {
    //   if (data.sector.industryType) {
    //     sectorChanged = true;
    //     entity.sector.industryType = data.sector.industryType;
    //   }

    //   if (data.sector.status) {
    //     sectorChanged = true;
    //     entity.sector.status = data.sector.status;
    //   }
    // }

    // if (sectorChanged) {
    //   var sectorSavedResult = await this.sectorEntityRepository.save(
    //     entity.sector,
    //   );
    //   entity.sector = sectorSavedResult;
    // }
    entity.save();

    return this.buyerInformationMappingService.mapEntityDetails(entity);
  }
}
