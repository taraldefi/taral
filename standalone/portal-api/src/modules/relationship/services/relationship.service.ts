import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { triggerError } from 'src/common/trigger.error';
import { BaseService } from 'src/common/services/base.service';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { CreateRelationshipRequest } from '../dto/request/create-relationship.dto';
import { UpdateRelationshipRequest } from '../dto/request/update-relationship.dto';
import { GetRelationshipResponse } from '../dto/response/get-relationship-response.dto';
import { CollaborationRelationshipEntity } from '../models/collaboration.relationship.entity';
import { PaymentExperience } from '../models/payment.experience';
import { CollaborationRelationshipsRepository } from '../repositories/collaboration.relationships.repository';
import { EntityMappingService } from './mapping.service';
import { BuyerCompanyEntityService } from 'src/modules/company/services/buyer-entity.service';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { BuyerCompanyEntityRepository } from 'src/modules/company/repositories/buyer.company.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RelationshipService extends BaseService {
  constructor(
    public configService: ConfigService,

    private buyerCompanyService: BuyerCompanyEntityService,

    @InjectRepository(BuyerCompanyEntity)
    private buyerCompanyRepository: BuyerCompanyEntityRepository,

    @InjectRepository(CollaborationRelationshipEntity)
    private relationshipRepository: CollaborationRelationshipsRepository,

    private mappingService: EntityMappingService,
  ) {
    super();
  }

  public async delete(id: string): Promise<void> {
    if (!id) throw triggerError('missing-entity-id');

    const entity = await this.relationshipRepository.findOneOrFail({
      relations: ['buyer', 'supplier'],
      where: { id: id },
    });

    if (!entity) throw triggerError('entity-not-found');

    await this.relationshipRepository.delete({ id: id });
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createEntity(
    entity: CreateRelationshipRequest,
    buyerId: string,
    supplier: SupplierCompanyEntity,
  ): Promise<CollaborationRelationshipEntity> {
    this.setupTransactionHooks();

    if (!entity) throw triggerError('missing-entity-id');

    const buyer = await this.buyerCompanyService.findBuyerEntityById(buyerId);

    if (!buyer) throw triggerError('entity-not-found');

    if (!supplier) throw triggerError('entity-not-found');

    const relationship = new CollaborationRelationshipEntity();
    relationship.paymentExperience = new PaymentExperience();
    relationship.buyer = buyer;
    relationship.supplier = supplier;
    relationship.influence = entity.influence ?? null;
    relationship.shareHoldingRelationship =
      entity.shareHoldingRelationship ?? null;
    relationship.paymentExperience.Delays =
      entity.paymentExperience.delays ?? null;
    relationship.paymentExperience.description =
      entity.paymentExperience.description ?? null;
    relationship.paymentExperience.History =
      entity.paymentExperience.history ?? null;
    relationship.paymentExperience.length =
      entity.paymentExperience.length ?? null;
    relationship.paymentExperience.noOfDeals =
      entity.paymentExperience.noOfDeals ?? null;
    relationship.paymentExperience.avgBusinessVol =
      entity.paymentExperience.avgBusinessVol ?? null;

    await this.relationshipRepository.save(relationship);

    buyer.relationshipWithSuppliers = [
      ...buyer.relationshipWithSuppliers,
      relationship,
    ];
    await this.buyerCompanyRepository.save(buyer);

    return relationship;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateEntity(
    entity: UpdateRelationshipRequest,
    relationshipId: string,
    buyerId: string,
    supplier: SupplierCompanyEntity,
  ): Promise<CollaborationRelationshipEntity> {
    this.setupTransactionHooks();

    const buyer = await this.buyerCompanyService.findBuyerEntityById(buyerId);

    if (!buyer) throw triggerError('entity-not-found');

    if (!supplier) throw triggerError('entity-not-found');

    const relationship = await this.relationshipRepository.findOneOrFail({
      relations: ['buyer', 'supplier'],
      where: { id: relationshipId },
    });

    if (!relationship) throw triggerError('entity-not-found');

    relationship.buyer = buyer;
    relationship.supplier = supplier;

    if (entity.influence) {
      relationship.influence = entity.influence;
    } else {
      relationship.influence = null;
    }

    if (entity.shareHoldingRelationship) {
      relationship.shareHoldingRelationship = entity.shareHoldingRelationship;
    } else {
      relationship.shareHoldingRelationship = null;
    }

    if (entity.paymentExperience) {
      if (entity.paymentExperience.delays) {
        relationship.paymentExperience.Delays = entity.paymentExperience.delays;
      } else {
        relationship.paymentExperience.Delays = null;
      }

      if (entity.paymentExperience.description) {
        relationship.paymentExperience.description =
          entity.paymentExperience.description;
      } else {
        relationship.paymentExperience.description = null;
      }

      if (entity.paymentExperience.history) {
        relationship.paymentExperience.History =
          entity.paymentExperience.history;
      } else {
        relationship.paymentExperience.History = null;
      }

      if (entity.paymentExperience.length) {
        relationship.paymentExperience.length = entity.paymentExperience.length;
      } else {
        relationship.paymentExperience.length = null;
      }

      if (entity.paymentExperience.noOfDeals) {
        relationship.paymentExperience.noOfDeals =
          entity.paymentExperience.noOfDeals;
      } else {
        relationship.paymentExperience.noOfDeals = null;
      }

      if (entity.paymentExperience.avgBusinessVol) {
        relationship.paymentExperience.avgBusinessVol =
          entity.paymentExperience.avgBusinessVol;
      } else {
        relationship.paymentExperience.avgBusinessVol = null;
      }
    }

    const updatedRelationship = await this.relationshipRepository.save(
      relationship,
    );

    return updatedRelationship;
  }

  public async getEntity(
    buyerId: string,
    supplierId: string,
  ): Promise<CollaborationRelationshipEntity> {
    const entity = await this.relationshipRepository.findOneOrFail({
      relations: ['buyer', 'supplier'],
      where: { buyer: buyerId, supplier: supplierId },
    });

    return entity;
  }

  public async getAll(): Promise<GetRelationshipResponse[]> {
    const entities = await this.relationshipRepository.find({
      relations: ['buyer', 'supplier'],
    });

    return this.mappingService.mapManyEntities(entities);
  }
}
