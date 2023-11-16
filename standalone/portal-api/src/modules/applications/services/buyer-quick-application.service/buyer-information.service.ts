import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBuyerRequest } from '../../dto/request/buyer-information/create-buyer.dto';
import { BuyerCompanyEntityService } from 'src/modules/company/services/buyer-entity.service';
import { QuickApplicationEntity } from '../../models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { GetBuyerResponse } from 'src/modules/buyer/dto/response/get-buyer-response.dto';
import { UpdateBuyerRequest } from 'src/modules/buyer/dto/request/update-buyer.dto';
import { CompanyAddressRepository } from 'src/modules/company-information/repositories/company.information.address.repository';
import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { EntityNotFoundError } from 'typeorm';
import { CompanyAddressEntity } from 'src/modules/company-information/models/company.information.address.entity';
import { BuyerCompanyInformationEntity } from 'src/modules/company-information/models/buyer.company.information.entity';
import { CompanyTaxAndRevenueEntity } from 'src/modules/company-information/models/company.information.tax.and.revenue.entity';
import { CompanyTaxAndRevenueEntityRepository } from 'src/modules/supplier/repositories/supplier-company-tax-and-revenue.repository';
import { BuyerCompanyInformationRepository } from 'src/modules/company-information/repositories/buyer.company.information.repository';
import { SectorEntity } from 'src/modules/sectors/models/sector.entity';
import { SectorEntityRepository } from 'src/modules/company/repositories/sector.repository';
import { EntityMappingService } from 'src/modules/company-information/services/mapping.service';
import { triggerError } from 'src/common/trigger.error';
import { CreateBuyerCompanyRequest } from '../../dto/request/buyer-information/create-buyer-company.dto';
import { UpdateBuyerCompanyRequest } from 'src/modules/buyer/dto/request/update-buyer-company.dto';

@Injectable()
export class BuyerQuickApplicationBuyerInformationService extends BaseService {
  constructor(
    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressRepository,

    @InjectRepository(CompanyTaxAndRevenueEntity)
    private companyTaxAndRevenueRepository: CompanyTaxAndRevenueEntityRepository,

    @InjectRepository(BuyerCompanyInformationEntity)
    private buyerCompanyInformationRepository: BuyerCompanyInformationRepository,

    @InjectRepository(SectorEntity)
    private sectorEntityRepository: SectorEntityRepository,

    private readonly buyerCompanyService: BuyerCompanyEntityService,
    private readonly buyerInformationMappingService: EntityMappingService,
  ) {
    super();
  }

  public async getBuyerInformation(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['buyerInformation'],
      },
    );
    console.log('APPLICATION=----->', application);

    const buyer = await this.buyerCompanyService.findBuyerEntityById(
      application.company.id,
    );

    return this.buyerInformationMappingService.mapEntityDetails(buyer);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createBuyerInformation(
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
            'buyerInformation',
            'supplierInformation',
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

    if (application.buyerInformation) {
      throw new HttpException(
        'Buyer information already exists',
        HttpStatus.BAD_REQUEST,
      );
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
    application.buyerInformation = entity.companyInformation;

    await application.save();

    return this.buyerInformationMappingService.mapEntityDetails(entity);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateBuyerInformation(
    data: UpdateBuyerCompanyRequest,
    applicationId: string,
  ): Promise<GetBuyerResponse> {
    this.setupTransactionHooks();
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['buyerInformation'],
      },
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
