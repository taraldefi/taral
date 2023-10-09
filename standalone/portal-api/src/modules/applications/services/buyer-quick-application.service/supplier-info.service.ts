import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipService } from 'src/modules/relationship/services/relationship.service';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { SupplierService } from 'src/modules/supplier/services/supplier.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { CreateSupplierInformationRequest } from '../../dto/request/create-supplier-info.dto';

@Injectable()
export class BuyerQuickApplicationSupplierInformationService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly supplierService: SupplierService,
    private readonly relationshipService: RelationshipService,
  ) {}

  public async createSupplierInformation(
    data: CreateSupplierInformationRequest,
    applicationId: string,
  ): Promise<SupplierEntity> {
    const application = await this.buyerApplicationRepository.findOne(
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

    const savedSupplier = await this.supplierService.createEntity(
      data.supplierInformation,
    );

    const savedRelationship = await this.relationshipService.createEntity(
      data.relationshipWithSupplier,
      application.buyerInformation.id,
      savedSupplier.id,
    );

    application.supplierInformation = savedSupplier;
    application.buyerInformation.relationshipWithSuppliers = [
      savedRelationship,
    ];

    application.save();

    return savedSupplier;
  }
}
