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

@Injectable()
export class BuyerService extends BaseService {
  constructor(
    @InjectRepository(BuyerEntity)
    private buyerEntityRepository: BuyerEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressEntityRepository,

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

  public async getEntity(id: string): Promise<GetBuyerResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOne({
      relations: [
        'relationshipWithSuppliers',
        'sector',
        'company',
        'company.address',
      ],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    return this.mappingService.mapEntityDetails(entity);
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
    company.employeeCount = data.company.employeeCount;
    company.registrationNumbers = data.company.registrationNumbers;

    var companySavedResult = await this.buyerCompanyRepository.save(company);

    const sector = new SectorEntity();
    sector.industryType = data.sector.industryType;
    sector.status = data.sector.status;

    var sectorSavedResult = await this.sectorEntityRepository.save(sector);

    entity.company = companySavedResult;
    entity.sector = sectorSavedResult;

    var entitySavedResult = await this.buyerEntityRepository.save(entity);

    return entitySavedResult;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateEntity(
    id: string,
    data: UpdateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    this.setupTransactionHooks();

    const entity = await this.buyerEntityRepository.findOneOrFail({
      relations: [
        'relationshipWithSuppliers',
        'sector',
        'company',
        'company.address',
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
      var companySavedResult = await this.buyerCompanyRepository.save(
        entity.company,
      );
      entity.company = companySavedResult;
    }

    let sectorChanged = false;

    if (data.sector.industryType) {
      sectorChanged = true;
      entity.sector.industryType = data.sector.industryType;
    }

    if (data.sector.status) {
      sectorChanged = true;
      entity.sector.status = data.sector.status;
    }

    if (sectorChanged) {
      var sectorSavedResult = await this.sectorEntityRepository.save(
        entity.sector,
      );
      entity.sector = sectorSavedResult;
    }

    var updatedEntity = await this.buyerEntityRepository.save(entity);

    return this.mappingService.mapEntityDetails(updatedEntity);
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
