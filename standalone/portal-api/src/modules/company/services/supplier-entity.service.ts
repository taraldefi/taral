import { Storage } from '@modules/storage';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transactional,
  runOnTransactionComplete,
  runOnTransactionRollback,
} from 'src/common/transaction';
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
import { CompanyTaxAndRevenueEntity } from 'src/modules/company-information/models/company.information.tax.and.revenue.entity';
import { SupplierCompanyInformationRepository } from 'src/modules/company-information/repositories/supplier.company.information.repository';
import { UpdateSupplierEntityDto } from '../dto/request/update-supplier-entity.dto';
import { CompanyTaxAndRevenueRepository } from 'src/modules/company-information/repositories/company.information.tax.and.revenue.repository';

@Injectable()
export class SupplierCompanyEntityService {
  constructor(
    @InjectRepository(SupplierCompanyEntity)
    private supplierCompanyRepository: SupplierCompanyEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressRepository,

    @InjectRepository(CompanyTaxAndRevenueEntity)
    private companyTaxAndRevenueRepository: CompanyTaxAndRevenueRepository,

    @InjectRepository(SupplierCompanyInformationEntity)
    private supplierCompanyInformationRepository: SupplierCompanyInformationRepository,

    private mappingService: EntityMappingService,
  ) {}

  public async findSupplierEntityById(
    id: string,
  ): Promise<SupplierCompanyEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.supplierCompanyRepository.findOne(id, {
      relations: [
        'relationshipWithBuyers',
        'companyInformation',
        'companyInformation.address',
        'companyInformation.taxAndRevenue',
      ],
    });
    console.log('entity', entity);
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
        'companyInformation',
        'companyInformation.address',
        'companyInformation.taxAndRevenue',
      ],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    return this.mappingService.mapSupplierEntityDetails(entity);
  }
  public async getAllSupplierEntity(): Promise<SupplierCompanyEntity[]> {
    return await this.supplierCompanyRepository.find({
      select: ['id', 'name', 'abbreviation', 'logo'],
    });
  }

  @Transactional()
  public async updateSupplierEntity(
    id: string,
    data: UpdateSupplierEntityDto,
  ): Promise<GetSupplierEntityDetailsResponse> {
    runOnTransactionRollback((cb) =>
      console.log('Rollback error ' + cb.message),
    );

    runOnTransactionComplete((cb) => console.log('Transaction Complete'));

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
      relations: ['applications'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    if (data.abbreviation) {
      entity.abbreviation = data.abbreviation;
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
        await this.supplierCompanyInformationRepository.save(
          entity.companyInformation,
        );
      entity.companyInformation = companySavedResult;
    }

    entity.save();

    return this.mappingService.mapSupplierEntityDetails(entity);
  }

  @Transactional()
  public async createSupplierEntity(
    data: CreateSupplierEntityDto,
  ): Promise<GetSupplierEntityDetailsResponse> {
    runOnTransactionRollback((cb) =>
      console.log('Rollback error ' + cb.message),
    );

    runOnTransactionComplete((cb) => console.log('Transaction Complete'));

    const imageUUID = uuidv4();
    const storage = Storage.disk('files');
    const onDiskFilename = `${imageUUID}.png`;

    if (data.logo) {
      const _ = await storage.put(onDiskFilename, data.logo.buffer);
    } else {
      console.log('No logo provided for entity');
    }

    // const entityProducts = await this.createProducts();

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

    if (data.logo) {
      entity.logo = imageUUID;
    }

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

    var companySavedResult =
      await this.supplierCompanyInformationRepository.save(companyInformation);
    entity.companyInformation = companySavedResult;

    var result = await this.supplierCompanyRepository.save(entity);

    return this.mappingService.mapSupplierEntityDetails(result);
  }

  // private async createApplications(): Promise<LegalApplicationEntity[]> {
  //   const result: LegalApplicationEntity[] = [];

  //   for (let i = 0; i < 10; i++) {
  //     const application = new LegalApplicationEntity();

  //     application.title = `Legal Product #${i}`;
  //     application.issuanceDate = new Date(2022, 1, 1, 16, 30);

  //     await this.entityApplicationRepository.save(application);

  //     result.push(application);
  //   }

  //   return result;
  // }

  // private async createProducts(): Promise<LegalProductEntity[]> {
  //   const result: LegalProductEntity[] = [];

  //   for (let i = 0; i < 10; i++) {
  //     const product = new LegalProductEntity();

  //     product.title = `Legal Product #${i}`;
  //     product.issuanceDate = new Date(2022, 1, 1, 16, 30);
  //     product.maturityDate = new Date(2022, 1, 1, 16, 30);
  //     product.amount = 650000;

  //     await this.entityProductRepository.save(product);

  //     result.push(product);
  //   }

  //   return result;
  // }
}
