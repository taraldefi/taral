import { Storage } from '@modules/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { v4 as uuidv4 } from 'uuid';
import { triggerError } from '../../../common/trigger.error';
import { EntityMappingService } from './mapping.service';
import { SupplierCompanyEntity } from '../models/supplier.company.entity';
import { SupplierCompanyEntityRepository } from '../repositories/supplier.company.repository';
import { GetSupplierEntityDetailsResponse } from '../dto/response/get-supplier-entity-response.dto';
import { CreateSupplierEntityDto } from '../dto/request/create-supplier-entity.dto';
import { SupplierCompanyInformationEntity } from 'src/modules/company-information/models/supplier.company.information.entity';
import { CompanyAddressEntity } from 'src/modules/company-information/models/company.information.address.entity';
import { CompanyAddressRepository } from 'src/modules/company-information/repositories/company.information.address.repository';
import { SupplierCompanyInformationRepository } from 'src/modules/company-information/repositories/supplier.company.information.repository';
import { UpdateSupplierEntityDto } from '../dto/request/update-supplier-entity.dto';
import { BaseService } from 'src/common/services/base.service';
import { ConfigService } from '@nestjs/config';
import { SupplierCompanyTaxAndRevenueEntity } from '../models/supplier.company.tax.and.revenue.entity';
import { SupplierCompanyTaxAndRevenueRepository } from '../repositories/supplier.company.tax.and.revenue.repository';

@Injectable()
export class SupplierCompanyEntityService extends BaseService {
  constructor(
    public configService: ConfigService,

    @InjectRepository(SupplierCompanyEntity)
    private supplierCompanyRepository: SupplierCompanyEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressRepository,

    @InjectRepository(SupplierCompanyTaxAndRevenueEntity)
    private supplierCompanyTaxAndRevenueRepository: SupplierCompanyTaxAndRevenueRepository,

    @InjectRepository(SupplierCompanyInformationEntity)
    private supplierCompanyInformationRepository: SupplierCompanyInformationRepository,

    private mappingService: EntityMappingService,
  ) {
    super(configService);
  }

  public async findSupplierEntityById(
    id: string,
  ): Promise<SupplierCompanyEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.supplierCompanyRepository.findOne(id, {
      relations: [
        'relationshipWithBuyers',
        'applications',
        'companyInformation',
        'companyInformation.address',
      ],
    });

    if (!entity) throw triggerError('entity-not-found');

    return entity;
  }

  public async deleteSupplierEntity(id: string): Promise<void> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.supplierCompanyRepository.findOneOrFail({
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    await this.supplierCompanyRepository.delete({ id: id });
  }

  public async getSupplierEntity(
    id: string,
  ): Promise<GetSupplierEntityDetailsResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.supplierCompanyRepository.findOne({
      relations: [
        'relationshipWithBuyers',
        'companyInformation',
        'applications',
        'companyInformation.address',
        'taxAndRevenue',
      ],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');
    const latestTaxAndRevenue = await this.getLatestTaxAndRevenue(entity.id);

    return this.mappingService.mapSupplierEntityDetails(
      entity,
      latestTaxAndRevenue,
    );
  }
  public async getAllSupplierEntities(): Promise<SupplierCompanyEntity[]> {
    return await this.supplierCompanyRepository.find({
      select: ['id', 'name', 'abbreviation', 'logo'],
    });
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateSupplierEntity(
    id: string,
    data: UpdateSupplierEntityDto,
  ): Promise<GetSupplierEntityDetailsResponse> {
    this.setupTransactionHooks();

    if (!id) throw triggerError('missing-entity-id');

    const imageUUID = uuidv4();
    const storage = Storage.disk('files');
    const onDiskFilename = `${imageUUID}.png`;

    if (data.logo) {
      const _ = await storage.put(onDiskFilename, data.logo.buffer);
    } else {
      console.log('No logo provided for entity');
    }

    const entity = await this.supplierCompanyRepository.findOneOrFail({
      relations: ['applications', 'taxAndRevenue'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    if (data.abbreviation) {
      entity.abbreviation = data.abbreviation;
    }

    if (data.phoneNumber) {
      entity.phoneNumber = data.phoneNumber;
    }
    if (data.registrationNumber) {
      entity.registrationNumber = data.registrationNumber;
    }

    if (data.beneficialOwner) {
      entity.beneficialOwner = data.beneficialOwner;
    }

    if (data.coreBusiness) {
      entity.coreBusiness = data.coreBusiness;
    }

    if (data.headquarters) {
      entity.headquarters = data.headquarters;
    }

    if (data.incorporationDate) {
      entity.incorporationDate = data.incorporationDate;
    }

    if (data.industryType) {
      entity.industryType = data.industryType;
    }

    if (data.legalForm) {
      entity.legalForm = data.legalForm;
    }

    if (data.logo) {
      entity.logo = imageUUID;
    }

    if (data.name) {
      entity.name = data.name;
    }

    if (data.nationality) {
      entity.nationality = data.nationality;
    }

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
    let taxAndRevenueToBeChanged: SupplierCompanyTaxAndRevenueEntity =
      undefined;
    let newTaxAndRevenueInformationAdded = false;
    let fiscalYears = [];

    const getAllTaxAndRevenue = await this.getAllTaxAndRevenue(entity.id);

    if (getAllTaxAndRevenue.length > 0) {
      fiscalYears = await this.getAllFiscalYears(entity.id);
    }

    if (data.taxAndRevenue.lastFiscalYear) {
      const newFiscalYearLessThanAlreadyExistingYearData = fiscalYears.some(
        (fiscalYear) => fiscalYear > data.taxAndRevenue.lastFiscalYear,
      );
      if (newFiscalYearLessThanAlreadyExistingYearData) {
        throw new HttpException(
          'Fiscal year must be greater than the already existing year information',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (data.taxAndRevenue.lastFiscalYear > new Date().getFullYear()) {
        throw new HttpException(
          'Fiscal year must be less than the current year',
          HttpStatus.BAD_REQUEST,
        );
      }

      taxAndRevenueToBeChanged = getAllTaxAndRevenue.find(
        (taxAndRevenue) =>
          taxAndRevenue.lastFiscalYear ===
          parseInt(data.taxAndRevenue.lastFiscalYear.toString()),
      );

      if (!taxAndRevenueToBeChanged) {
        taxAndRevenueToBeChanged = new SupplierCompanyTaxAndRevenueEntity();
        newTaxAndRevenueInformationAdded = true;
      }
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
    if (data.taxAndRevenue.lastFiscalYear) {
      taxAndRevenueChanged = true;
      taxAndRevenueToBeChanged.lastFiscalYear =
        data.taxAndRevenue.lastFiscalYear;
    }
    if (data.taxAndRevenue.totalRevenue) {
      taxAndRevenueChanged = true;
      taxAndRevenueToBeChanged.totalRevenue = data.taxAndRevenue.totalRevenue;
    }
    if (taxAndRevenueChanged) {
      await this.supplierCompanyTaxAndRevenueRepository.save(
        taxAndRevenueToBeChanged,
      );
    }

    if (newTaxAndRevenueInformationAdded) {
      taxAndRevenueToBeChanged.supplierCompany = entity;
      const savedTaxAndRevenueResult =
        await this.supplierCompanyTaxAndRevenueRepository.save(
          taxAndRevenueToBeChanged,
        );

      entity.taxAndRevenue.push(savedTaxAndRevenueResult);
      await this.supplierCompanyRepository.save(entity);
    }

    let companyChanged = false;

    if (data.employeeCount) {
      companyChanged = true;
      entity.companyInformation.employeeCount = data.employeeCount;
    }

    if (companyChanged) {
      var companySavedResult =
        await this.supplierCompanyInformationRepository.save(
          entity.companyInformation,
        );
      entity.companyInformation = companySavedResult;
    }

    await this.supplierCompanyRepository.save(entity);
    const latestTaxAndRevenue = await this.getLatestTaxAndRevenue(entity.id);

    return this.mappingService.mapSupplierEntityDetails(
      entity,
      latestTaxAndRevenue,
    );
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createSupplierEntity(
    data: CreateSupplierEntityDto,
  ): Promise<GetSupplierEntityDetailsResponse> {
    this.setupTransactionHooks();

    const imageUUID = uuidv4();
    const storage = Storage.disk('files');
    const onDiskFilename = `${imageUUID}.png`;

    if (data.logo) {
      const _ = await storage.put(onDiskFilename, data.logo.buffer);
    } else {
      console.log('No logo provided for entity');
    }

    const entity = new SupplierCompanyEntity();
    const companyInformation = new SupplierCompanyInformationEntity();
    const address = new CompanyAddressEntity();

    companyInformation.address = address;
    entity.companyInformation = companyInformation;

    entity.abbreviation = data.abbreviation;
    entity.name = data.name;
    entity.beneficialOwner = data.beneficialOwner;
    entity.coreBusiness = data.coreBusiness;
    entity.headquarters = data.headquarters;
    entity.incorporationDate = data.incorporationDate;
    entity.industryType = data.industryType;
    entity.legalForm = data.legalForm;
    entity.nationality = data.nationality;

    entity.phoneNumber = data.phoneNumber;
    entity.registrationNumber = data.registrationNumber;

    if (data.logo) {
      entity.logo = imageUUID;
    }

    entity.companyInformation.address.addressLine1 = data.address.addressLine1;
    entity.companyInformation.address.addressLine2 = data.address.addressLine2;
    entity.companyInformation.address.city = data.address.city;
    entity.companyInformation.address.postalCode = data.address.postalCode;

    var addressSavedResult = await this.companyAddressRepository.save(address);

    companyInformation.address = addressSavedResult;
    companyInformation.employeeCount = data.employeeCount;

    if (data.taxAndRevenue) {
      const taxAndRevenue = new SupplierCompanyTaxAndRevenueEntity();
      entity.taxAndRevenue = [taxAndRevenue];
      taxAndRevenue.audited = data.taxAndRevenue.audited;
      taxAndRevenue.taxNumber = data.taxAndRevenue.taxNumber;
      taxAndRevenue.exportRevenuePercentage =
        data.taxAndRevenue.exportRevenuePercentage;
      taxAndRevenue.exportValue = data.taxAndRevenue.exportValue;
      taxAndRevenue.lastFiscalYear = data.taxAndRevenue.lastFiscalYear;
      taxAndRevenue.totalRevenue = data.taxAndRevenue.totalRevenue;
      var taxAndRevenueSavedResult =
        await this.supplierCompanyTaxAndRevenueRepository.save(taxAndRevenue);

      entity.taxAndRevenue[0] = taxAndRevenueSavedResult;
    }

    var companySavedResult =
      await this.supplierCompanyInformationRepository.save(companyInformation);
    entity.companyInformation = companySavedResult;

    var result = await this.supplierCompanyRepository.save(entity);
    const latestTaxAndRevenue = await this.getLatestTaxAndRevenue(entity.id);

    return this.mappingService.mapSupplierEntityDetails(
      result,
      latestTaxAndRevenue,
    );
  }

  private async getAllFiscalYears(companyId: string) {
    let fiscalYears = [];
    let allTaxAndRevenue = await this.getAllTaxAndRevenue(companyId);

    fiscalYears = allTaxAndRevenue.map((fiscalYear) => {
      return fiscalYear.lastFiscalYear;
    });

    return fiscalYears;
  }

  private async getAllTaxAndRevenue(companyId: string) {
    const fetchAllTaxAndRevenue =
      await this.supplierCompanyTaxAndRevenueRepository.find({
        select: [
          'id',
          'audited',
          'totalRevenue',
          'exportRevenuePercentage',
          'exportValue',
          'taxNumber',
          'lastFiscalYear',
          'supplierCompany',
        ],
        where: { supplierCompany: companyId },
      });

    return fetchAllTaxAndRevenue || [];
  }

  private async getLatestTaxAndRevenue(
    companyId: string,
  ): Promise<SupplierCompanyTaxAndRevenueEntity> {
    let allTaxAndRevenue = await this.getAllTaxAndRevenue(companyId);
    let latestTaxAndRevenue: SupplierCompanyTaxAndRevenueEntity = undefined;

    const fiscalYears = allTaxAndRevenue.map((fiscalYear) => {
      return parseInt(fiscalYear.lastFiscalYear.toString());
    });

    latestTaxAndRevenue = allTaxAndRevenue.find(
      (taxAndRevenue) =>
        taxAndRevenue.lastFiscalYear === Math.max(...fiscalYears),
    );

    return latestTaxAndRevenue;
  }
}
