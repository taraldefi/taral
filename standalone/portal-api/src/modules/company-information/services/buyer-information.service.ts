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
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { BuyerCompanyEntityRepository } from 'src/modules/company/repositories/buyer.company.repository';

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

    @InjectRepository(BuyerCompanyEntity)
    private buyerCompanyRepository: BuyerCompanyEntityRepository,

    private readonly buyerCompanyService: BuyerCompanyEntityService,
    private readonly buyerInformationMappingService: EntityMappingService,
  ) {
    super(configService);
  }

  public async get(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: [
          'buyerInformation',
          'buyerInformation.address',
          'buyerInformation.taxAndRevenue',
        ],
      },
    );

    const buyer = await this.buyerCompanyService.findBuyerEntityById(
      application.company.id,
    );

    return this.buyerInformationMappingService.mapEntityDetails(
      buyer,
      application.buyerInformation,
    );
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
            'buyerInformation',
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
    // get the buyer company to fill in the buyer company information
    const entity = await this.buyerCompanyService.findBuyerEntityById(
      application.company.id,
    );

    let entityAddressExists = false;
    let entityTaxAndRevenueExists = false;
    let fiscalYears = [];
    if (entity.companyInformation && entity.companyInformation.taxAndRevenue) {
      entityTaxAndRevenueExists = true;
      fiscalYears = entity.companyInformation.taxAndRevenue.map(
        (fiscalYear) => {
          return fiscalYear.lastFiscalYear;
        },
      );
    }
    if (entity.companyInformation && entity.companyInformation.address) {
      entityAddressExists = true;
    }
    const companyInformation = new BuyerCompanyInformationEntity();
    const address = new CompanyAddressEntity();

    companyInformation.address = address;
    companyInformation.employeeCount = data.employeeCount;
    companyInformation.phoneNumber = data.phoneNumber;
    companyInformation.registrationNumbers = data.registrationNumbers;

    address.addressLine1 = data.address.addressLine1;
    address.addressLine2 = data.address.addressLine2;
    address.city = data.address.city;
    address.postalCode = data.address.postalCode;

    var addressSavedResult = await this.companyAddressRepository.save(address);

    // if company information does not already exist, create one for company and clone it for application
    if (!entityAddressExists && !entityTaxAndRevenueExists) {
      // create a duplicate company information for the application
      const duplicateCompanyInformation = new BuyerCompanyInformationEntity();
      const duplicateAddress = new CompanyAddressEntity();

      duplicateCompanyInformation.address = duplicateAddress;
      duplicateCompanyInformation.employeeCount = data.employeeCount;
      duplicateCompanyInformation.phoneNumber = data.phoneNumber;
      duplicateCompanyInformation.registrationNumbers =
        data.registrationNumbers;

      duplicateAddress.addressLine1 = data.address.addressLine1;
      duplicateAddress.addressLine2 = data.address.addressLine2;
      duplicateAddress.city = data.address.city;
      duplicateAddress.postalCode = data.address.postalCode;

      //save the duplicate address
      await this.companyAddressRepository.save(duplicateAddress);

      entity.companyInformation = companyInformation;
      entity.companyInformation.address = addressSavedResult;

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

      companyInformation.taxAndRevenue = [taxAndRevenueSavedResult];
      duplicateCompanyInformation.taxAndRevenue = [taxAndRevenueSavedResult];

      let companySavedResult =
        await this.buyerCompanyInformationRepository.save(companyInformation);
      entity.companyInformation = companySavedResult;
      await this.buyerCompanyRepository.save(entity);

      //save the duplicate company information

      let clonedCompanySavedResult =
        await this.buyerCompanyInformationRepository.save(
          duplicateCompanyInformation,
        );

      application.buyerInformation = clonedCompanySavedResult;
      await this.buyerApplicationRepository.save(application);
    } else {
      // if company information does already exist, create one for application
      if (fiscalYears.includes(data.taxAndRevenue.lastFiscalYear)) {
        throw new HttpException(
          'Tax and Revenue information for this year already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newFiscalYearLessThanAlreadyExistingYearData = fiscalYears.some(
        (fiscalYear) => fiscalYear > data.taxAndRevenue.lastFiscalYear,
      );
      if (newFiscalYearLessThanAlreadyExistingYearData) {
        throw new HttpException(
          'Fiscal year must be greater than the previous year',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (data.taxAndRevenue.lastFiscalYear > new Date().getFullYear()) {
        throw new HttpException(
          'Fiscal year must be less than the current year',
          HttpStatus.BAD_REQUEST,
        );
      }
      // if company information does already exist, create one for application
      const applicationBuyerInformation = new BuyerCompanyInformationEntity();
      applicationBuyerInformation.address = addressSavedResult;

      applicationBuyerInformation.employeeCount = data.employeeCount;
      applicationBuyerInformation.phoneNumber = data.phoneNumber;
      applicationBuyerInformation.registrationNumbers =
        data.registrationNumbers;

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

      applicationBuyerInformation.taxAndRevenue = [
        ...entity.companyInformation.taxAndRevenue,
        taxAndRevenueSavedResult,
      ];

      entity.companyInformation.taxAndRevenue.push(taxAndRevenueSavedResult);

      var companySavedCloneResult =
        await this.buyerCompanyInformationRepository.save(
          applicationBuyerInformation,
        );
      application.buyerInformation = companySavedCloneResult;
      await this.buyerApplicationRepository.save(application);
    }

    // if (data.sector) {
    //   const sector = new SectorEntity();
    //   sector.industryType = data.sector.industryType;
    //   sector.status = data.sector.status;

    //   var sectorSavedResult = await this.sectorEntityRepository.save(sector);
    //   entity.sector = sectorSavedResult;
    // }

    return this.buyerInformationMappingService.mapEntityDetails(
      entity,
      application.buyerInformation,
    );
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
      {
        relations: [
          'buyerInformation',
          'buyerInformation.address',
          'buyerInformation.taxAndRevenue',
        ],
      },
    );
    const entity = await this.buyerCompanyService.findBuyerEntityById(
      application.company.id,
    );

    let taxAndRevenueToBeChanged: CompanyTaxAndRevenueEntity = undefined;

    if (!entity) throw triggerError('entity-not-found');

    let companyAddressChanged = false;

    if (data.address.addressLine1) {
      companyAddressChanged = true;
      application.buyerInformation.address.addressLine1 =
        data.address.addressLine1;
    }

    if (data.address.addressLine2) {
      companyAddressChanged = true;
      application.buyerInformation.address.addressLine2 =
        data.address.addressLine2;
    }

    if (data.address.city) {
      companyAddressChanged = true;
      application.buyerInformation.address.city = data.address.city;
    }

    if (data.address.postalCode) {
      companyAddressChanged = true;
      application.buyerInformation.address.postalCode = data.address.postalCode;
    }

    if (companyAddressChanged) {
      var addressSavedResult = await this.companyAddressRepository.save(
        application.buyerInformation.address,
      );
      application.buyerInformation.address = addressSavedResult;
    }
    let taxAndRevenueChanged = false;
    if (data.taxAndRevenue.lastFiscalYear) {
      const getAllTaxAndRevenue =
        await this.companyTaxAndRevenueRepository.find({
          select: [
            'id',
            'audited',
            'totalRevenue',
            'exportRevenuePercentage',
            'exportValue',
            'taxNumber',
            'lastFiscalYear',
            'company',
          ],
          where: { company: application.buyerInformation.id },
        });
      taxAndRevenueToBeChanged = getAllTaxAndRevenue.find((taxAndRevenue) => {
        return (
          taxAndRevenue.lastFiscalYear === data.taxAndRevenue.lastFiscalYear
        );
      });

      console.log('TEST', getAllTaxAndRevenue, taxAndRevenueToBeChanged);
    }

    if (data.taxAndRevenue.taxNumber) {
      taxAndRevenueChanged = true;
      taxAndRevenueToBeChanged.taxNumber = data.taxAndRevenue.taxNumber;
    }
    if (data.taxAndRevenue.audited) {
      taxAndRevenueChanged = true;
      taxAndRevenueToBeChanged.audited = data.taxAndRevenue.audited;
    }
    if (data.taxAndRevenue.exportRevenuePercentage) {
      taxAndRevenueChanged = true;
      taxAndRevenueToBeChanged.exportRevenuePercentage =
        data.taxAndRevenue.exportRevenuePercentage;
    }
    if (data.taxAndRevenue.exportValue) {
      taxAndRevenueChanged = true;
      taxAndRevenueToBeChanged.exportValue = data.taxAndRevenue.exportValue;
    }

    if (data.taxAndRevenue.totalRevenue) {
      taxAndRevenueChanged = true;
      taxAndRevenueToBeChanged.totalRevenue = data.taxAndRevenue.totalRevenue;
    }
    if (taxAndRevenueChanged) {
      await this.companyTaxAndRevenueRepository.save(taxAndRevenueToBeChanged);
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
    // entity.save();

    return this.buyerInformationMappingService.mapEntityDetails(
      entity,
      application.buyerInformation,
    );
  }
}
