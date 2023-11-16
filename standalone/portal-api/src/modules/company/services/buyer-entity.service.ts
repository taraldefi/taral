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
import { CreateEntityDto } from '../dto/request/create-entity.dto';
import { UpdateEntityDto } from '../dto/request/update-entity.dto';
import { GetEntityDetailsResponse } from '../dto/response/get-entity-details-response.dto';
import { BuyerCompanyEntity } from '../models/buyer.company.entity';
import { BuyerCompanyEntityRepository } from '../repositories/buyer.company.repository';
import { EntityMappingService } from './mapping.service';

@Injectable()
export class BuyerCompanyEntityService {
  constructor(
    @InjectRepository(BuyerCompanyEntity)
    private buyerEntityRepository: BuyerCompanyEntityRepository,

    private mappingService: EntityMappingService,
  ) {}

  public async findBuyerEntityById(id: string): Promise<BuyerCompanyEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOne(id, {
      relations: [
        'applications',
        'companyInformation',
        'companyInformation.address',
        'companyInformation.taxAndRevenue',
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

    return this.mappingService.mapEntityDetails(entity);
  }
  public async getAllBuyerEntity(): Promise<BuyerCompanyEntity[]> {
    return await this.buyerEntityRepository.find({
      relations: ['applications'],
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

    var updatedEntity = await this.buyerEntityRepository.save(entity);

    return this.mappingService.mapEntityDetails(updatedEntity);
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

    var result = await this.buyerEntityRepository.save(entity);

    return this.mappingService.mapEntityDetails(result);
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
