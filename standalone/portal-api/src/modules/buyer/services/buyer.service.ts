import { Injectable } from "@nestjs/common";
import { BuyerEntityRepository } from "../repositories/buyer.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { BuyerEntity } from "../models/buyer.entity";
import { triggerError } from "src/modules/entity/utils/trigger.error";
import { GetBuyerResponse } from "../dto/response/get-buyer-response.dto";
import { EntityMappingService } from "./mapping.service";
import { IsolationLevel, Transactional } from "src/common/transaction";
import { CreateBuyerRequest } from "../dto/request/create-buyer-request.dto";
import { BaseService } from "src/modules/auctionhistory/services/base.service";
import { BuyerCompanyEntity } from "src/modules/company/models/buyer.company.entity";
import { CompanyAddressEntity } from "src/modules/company/models/company.address.entity";
import { BuyerCompanyEntityRepository } from "../repositories/buyer-company.repository";
import { SectorEntityRepository } from "../repositories/sector.repository";
import { CompanyAddressEntityRepository } from "../repositories/company-address.repository";
import { SectorEntity } from "src/modules/sectors/models/sector.entity";
import { UpdateBuyerRequest } from "../dto/request/update-buyer-request.dto";

@Injectable()
export class BuyerService extends BaseService {
 constructor(
    @InjectRepository(BuyerEntity)
    private buyerEntityRepository: BuyerEntityRepository,

    @InjectRepository(CompanyAddressEntity)
    private companyAddressRepository: CompanyAddressEntityRepository,

    @InjectRepository(BuyerCompanyEntity)
    private buyerCompanyRepository: BuyerCompanyEntityRepository,

    @InjectRepository(SectorEntityRepository)
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

  public async getBuyer(id: string): Promise<GetBuyerResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.buyerEntityRepository.findOne({
      relations: ['relationshipWithSuppliers'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    return this.mappingService.mapEntityDetails(entity);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createEntity(
    data: CreateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    this.setupTransactionHooks();

    const entity = new BuyerEntity();
    const company = new BuyerCompanyEntity();

    const address = new CompanyAddressEntity();
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

    return this.mappingService.mapEntityDetails(entitySavedResult);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateEntity(
    id: string, 
    data: UpdateBuyerRequest): Promise<GetBuyerResponse> {
    this.setupTransactionHooks();

    const entity = await this.buyerEntityRepository.findOneOrFail({
      relations: ['relationshipWithSuppliers', 'sector', 'company'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    if (data.company.address.addressLine1) {
      entity.company.address.addressLine1 = data.company.address.addressLine1;
    }

    if (data.company.address.addressLine2) {
      entity.company.address.addressLine2 = data.company.address.addressLine2;
    }

    if (data.company.address.city) {
      entity.company.address.city = data.company.address.city;
    }

    if (data.company.address.postalCode) {
      entity.company.address.postalCode = data.company.address.postalCode;
    }

    if (data.company.companyName) {
      entity.company.companyName = data.company.companyName;
    }

    if (data.company.dateEstablished) {
      entity.company.dateEstablished = data.company.dateEstablished;
    }

    if (data.company.employeeCount) {
      entity.company.employeeCount = data.company.employeeCount;
    }

    if (data.company.registrationNumbers) {
      entity.company.registrationNumbers = data.company.registrationNumbers;
    }

    if (data.sector.industryType) {
      entity.sector.industryType = data.sector.industryType;
    }

    if (data.sector.status) {
      entity.sector.status = data.sector.status;
    }

    var updatedEntity = await this.buyerEntityRepository.save(entity);

    return this.mappingService.mapEntityDetails(updatedEntity);
  }
}
