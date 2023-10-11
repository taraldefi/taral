import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipService } from 'src/modules/relationship/services/relationship.service';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { SupplierService } from 'src/modules/supplier/services/supplier.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { CreateSupplierInformationRequest } from '../../dto/request/create-supplier-info.dto';
import { GetSupplierResponse } from 'src/modules/supplier/dto/response/get-supplier-response.dto';
import { UpdateSupplierInformationRequest } from '../../dto/request/update-supplier-info.dto';
import { BuyerService } from 'src/modules/buyer/services/buyer.service';
import { BuyerQuickApplicationMappingService } from './mapping.service';
import { SupplierInformationResponse } from '../../dto/response/get-supplier-information-response.dto';

@Injectable()
export class BuyerQuickApplicationSupplierInformationService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly mappingService: BuyerQuickApplicationMappingService,
    private readonly supplierService: SupplierService,
    private readonly relationshipService: RelationshipService,
    private readonly buyerService: BuyerService,
  ) {}

  public async getSupplierInformation(
    applicationId: string,
  ): Promise<SupplierInformationResponse> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['supplierInformation', 'buyerInformation'],
      },
    );

    const savedSupplier = await this.supplierService.getEntity(
      application.supplierInformation.id,
    );

    const savedRelationship = await this.relationshipService.getEntity(
      application.buyerInformation.id,
      application.supplierInformation.id,
    );

    return this.mappingService.mapSupplierInformationForImporterApplication(
      savedSupplier,
      savedRelationship,
    );
  }

  public async createSupplierInformation(
    data: CreateSupplierInformationRequest,
    applicationId: string,
  ): Promise<SupplierInformationResponse> {
    //TODO: check for application so that isolated supplier creation is prevented
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

    return this.mappingService.mapSupplierInformationForImporterApplication(
      savedSupplier,
      savedRelationship,
    );
  }

  public async updateSupplierInformation(
    applicationId: string,
    data: UpdateSupplierInformationRequest,
  ): Promise<void> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['supplierInformation', 'buyerInformation'],
      },
    );

    const buyer = await this.buyerService.getEntity(
      application.buyerInformation.id,
    );

    const supplier = await this.supplierService.getEntity(
      application.supplierInformation.id,
    );

    if (data.supplierInformation) {
      await this.supplierService.updateEntity(
        application.supplierInformation.id,
        data.supplierInformation,
      );
    }

    if (data.relationshipWithSupplier) {
      await this.relationshipService.updateEntity(
        data.relationshipWithSupplier,
        buyer.relationshipWithSuppliers[0].id,
        application.buyerInformation.id,
        supplier.id,
      );
    }
  }
}
