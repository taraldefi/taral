import { Storage } from '@modules/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transactional,
  runOnTransactionComplete,
  runOnTransactionRollback,
} from 'src/common/transaction';
import { v4 as uuidv4 } from 'uuid';
import { triggerError } from '../../../common/trigger.error';
import { CreateEntityDto } from '../dto/request/create-entity.dto';
import { UpdateEntityDto } from '../dto/request/update-entity.dto';
import { GetEntityDetailsResponse } from '../dto/response/get-entity-details-response.dto';
import { BuyerCompanyEntity } from '../models/buyer.company.entity';
import { BuyerCompanyEntityRepository } from '../repositories/buyer.company.repository';
import { EntityMappingService } from './mapping.service';
import { BuyerCompanyTaxAndRevenueEntity } from '../models/buyer.company.tax.and.revenue.entity';
import { BuyerCompanyTaxAndRevenueRepository } from '../repositories/buyer.company.tax.and.revenue.repository';

@Injectable()
export class BuyerCompanyEntityService {
  constructor(
    @InjectRepository(BuyerCompanyEntity)
    private buyerEntityRepository: BuyerCompanyEntityRepository,

    @InjectRepository(BuyerCompanyTaxAndRevenueEntity)
    private buyerCompanyTaxAndRevenueRepository: BuyerCompanyTaxAndRevenueRepository,

    private mappingService: EntityMappingService,
  ) {}

  public async findBuyerEntityById(id: string): Promise<BuyerCompanyEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOne(id, {
      relations: [
        'relationshipWithSuppliers',
        'applications',
        'companyInformation',
        'companyInformation.address',
        'taxAndRevenue',
      ],
    });
    console.log('entity', entity);
    if (!entity) throw triggerError('entity-not-found');

    return entity;
  }

  public async deleteBuyerEntity(id: string): Promise<void> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOneOrFail({
      relations: ['applications'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    await this.buyerEntityRepository.delete({ id: id });
  }

  public async getBuyerEntity(id: string): Promise<GetEntityDetailsResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOne({
      relations: ['applications'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    const latestTaxAndRevenue = await this.getLatestTaxAndRevenue(entity.id);

    return this.mappingService.mapEntityDetails(entity, latestTaxAndRevenue);
  }
  public async getAllBuyerEntity(): Promise<BuyerCompanyEntity[]> {
    return await this.buyerEntityRepository.find({
      select: ['id', 'name', 'abbreviation', 'logo'],
    });
  }

  @Transactional()
  public async updateBuyerEntity(
    id: string,
    data: UpdateEntityDto,
  ): Promise<GetEntityDetailsResponse> {
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

    const entity = await this.buyerEntityRepository.findOneOrFail({
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

    let taxAndRevenueChanged = false;
    let taxAndRevenueToBeChanged: BuyerCompanyTaxAndRevenueEntity = undefined;
    let newTaxAndRevenueInformationAdded = false;
    let fiscalYears = [];

    const getAllTaxAndRevenue = await this.getAllTaxAndRevenue(entity.id);

    if (getAllTaxAndRevenue.length > 0) {
      fiscalYears = await this.getAllFiscalYears(entity.id);
    }

    if (data.taxAndRevenue) {
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
          taxAndRevenueToBeChanged = new BuyerCompanyTaxAndRevenueEntity();
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
    }

    if (taxAndRevenueChanged) {
      await this.buyerCompanyTaxAndRevenueRepository.save(
        taxAndRevenueToBeChanged,
      );
    }

    if (newTaxAndRevenueInformationAdded) {
      taxAndRevenueToBeChanged.buyerCompany = entity;
      const savedTaxAndRevenueResult =
        await this.buyerCompanyTaxAndRevenueRepository.save(
          taxAndRevenueToBeChanged,
        );

      entity.taxAndRevenue.push(savedTaxAndRevenueResult);
      await this.buyerEntityRepository.save(entity);
    }

    var updatedEntity = await this.buyerEntityRepository.save(entity);
    const latestTaxAndRevenue = await this.getLatestTaxAndRevenue(entity.id);

    return this.mappingService.mapEntityDetails(
      updatedEntity,
      latestTaxAndRevenue,
    );
  }

  @Transactional()
  public async createBuyerEntity(
    data: CreateEntityDto,
  ): Promise<GetEntityDetailsResponse> {
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

    const entity = new BuyerCompanyEntity();
    entity.phoneNumber = data.phoneNumber;
    entity.registrationNumber = data.registrationNumber;
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

    // entityProducts.forEach((product) => (product.legalEntity = entity));

    // entity.legalProducts = [...entityProducts];
    entity.applications = [];

    const taxAndRevenue = new BuyerCompanyTaxAndRevenueEntity();
    entity.taxAndRevenue = [taxAndRevenue];
    taxAndRevenue.audited = data.taxAndRevenue.audited;
    taxAndRevenue.taxNumber = data.taxAndRevenue.taxNumber;
    taxAndRevenue.exportRevenuePercentage =
      data.taxAndRevenue.exportRevenuePercentage;
    taxAndRevenue.exportValue = data.taxAndRevenue.exportValue;
    taxAndRevenue.lastFiscalYear = data.taxAndRevenue.lastFiscalYear;
    taxAndRevenue.totalRevenue = data.taxAndRevenue.totalRevenue;
    var taxAndRevenueSavedResult =
      await this.buyerCompanyTaxAndRevenueRepository.save(taxAndRevenue);

    entity.taxAndRevenue[0] = taxAndRevenueSavedResult;

    var result = await this.buyerEntityRepository.save(entity);
    const latestTaxAndRevenue = await this.getLatestTaxAndRevenue(result.id);

    return this.mappingService.mapEntityDetails(result, latestTaxAndRevenue);
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
      await this.buyerCompanyTaxAndRevenueRepository.find({
        select: [
          'id',
          'audited',
          'totalRevenue',
          'exportRevenuePercentage',
          'exportValue',
          'taxNumber',
          'lastFiscalYear',
          'buyerCompany',
        ],
        where: { buyerCompany: companyId },
      });

    return fetchAllTaxAndRevenue || [];
  }

  public async getLatestTaxAndRevenue(
    companyId: string,
  ): Promise<BuyerCompanyTaxAndRevenueEntity> {
    let allTaxAndRevenue = await this.getAllTaxAndRevenue(companyId);
    let latestTaxAndRevenue: BuyerCompanyTaxAndRevenueEntity = undefined;

    const fiscalYears = allTaxAndRevenue.map((taxAndRevenue) => {
      return parseInt(taxAndRevenue.lastFiscalYear.toString());
    });

    latestTaxAndRevenue = allTaxAndRevenue.find(
      (taxAndRevenue) =>
        taxAndRevenue.lastFiscalYear === Math.max(...fiscalYears),
    );

    return latestTaxAndRevenue;
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
