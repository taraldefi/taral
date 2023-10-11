import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { triggerError } from 'src/common/trigger.error';
import { BaseService } from 'src/modules/auctionhistory/services/base.service';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';
import { BuyerEntityRepository } from 'src/modules/buyer/repositories/buyer.repository';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { SupplierRepository } from 'src/modules/supplier/repositories/supplier.repository';
import { CreateRelationshipRequest } from '../dto/request/create-relationship.dto';
import { UpdateRelationshipRequest } from '../dto/request/update-relationship.dto';
import { GetRelationshipResponse } from '../dto/response/get-relationship-response.dto';
import { CollaborationRelationshipEntity } from '../models/collaboration.relationship.entity';
import { PaymentExperience } from '../models/payment.experience';
import { CollaborationRelationshipsRepository } from '../repositories/collaboration.relationships.repository';
import { EntityMappingService } from './mapping.service';

@Injectable()
export class RelationshipService extends BaseService {
  constructor(
    @InjectRepository(BuyerEntity)
    private buyerEntityRepository: BuyerEntityRepository,

    @InjectRepository(SupplierEntity)
    private supplierEntityRepository: SupplierRepository,

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
    supplierId: string,
  ): Promise<CollaborationRelationshipEntity> {
    this.setupTransactionHooks();

    if (!entity) throw triggerError('missing-entity-id');

    const buyer = await this.buyerEntityRepository.findOneOrFail({
      relations: ['relationshipWithSuppliers'],
      where: { id: buyerId },
    });

    if (!buyer) throw triggerError('entity-not-found');

    const supplier = await this.supplierEntityRepository.findOneOrFail({
      relations: ['relationshipWithBuyers'],
      where: { id: supplierId },
    });

    if (!supplier) throw triggerError('entity-not-found');

    const relationship = new CollaborationRelationshipEntity();
    relationship.paymentExperience = new PaymentExperience();
    relationship.buyer = buyer;
    relationship.supplier = supplier;
    relationship.influence = entity.influence;
    relationship.shareHoldingRelationship = entity.shareHoldingRelationship;
    relationship.paymentExperience.Delays = entity.paymentExperience.delays;
    relationship.paymentExperience.description =
      entity.paymentExperience.description;
    relationship.paymentExperience.History = entity.paymentExperience.history;
    relationship.paymentExperience.length = entity.paymentExperience.length;
    relationship.paymentExperience.noOfDeals =
      entity.paymentExperience.noOfDeals;
    relationship.paymentExperience.avgBusinessVol =
      entity.paymentExperience.avgBusinessVol;

    await this.relationshipRepository.save(relationship);

    return relationship;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateEntity(
    entity: UpdateRelationshipRequest,
    relationshipId: string,
    buyerId: string,
    supplierId: string,
  ): Promise<GetRelationshipResponse> {
    this.setupTransactionHooks();

    const buyer = await this.buyerEntityRepository.findOneOrFail({
      relations: ['relationshipWithSuppliers'],
      where: { id: buyerId },
    });

    if (!buyer) throw triggerError('entity-not-found');

    const supplier = await this.supplierEntityRepository.findOneOrFail({
      relations: ['relationshipWithBuyers'],
      where: { id: supplierId },
    });

    if (!supplier) throw triggerError('entity-not-found');

    const relationship = await this.relationshipRepository.findOneOrFail({
      relations: ['buyer', 'supplier'],
      where: { id: relationshipId },
    });

    if (!relationship) throw triggerError('entity-not-found');

    if (entity.influence) {
      relationship.influence = entity.influence;
    }

    if (entity.shareHoldingRelationship) {
      relationship.shareHoldingRelationship = entity.shareHoldingRelationship;
    }

    if (entity.paymentExperience) {
      if (entity.paymentExperience.delays) {
        relationship.paymentExperience.Delays = entity.paymentExperience.delays;
      }

      if (entity.paymentExperience.description) {
        relationship.paymentExperience.description =
          entity.paymentExperience.description;
      }

      if (entity.paymentExperience.history) {
        relationship.paymentExperience.History =
          entity.paymentExperience.history;
      }

      if (entity.paymentExperience.length) {
        relationship.paymentExperience.length = entity.paymentExperience.length;
      }

      if (entity.paymentExperience.noOfDeals) {
        relationship.paymentExperience.noOfDeals =
          entity.paymentExperience.noOfDeals;
      }

      if (entity.paymentExperience.avgBusinessVol) {
        relationship.paymentExperience.avgBusinessVol =
          entity.paymentExperience.avgBusinessVol;
      }
    }

    await this.relationshipRepository.save(relationship);

    return this.mappingService.mapEntityDetails(relationship);
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
