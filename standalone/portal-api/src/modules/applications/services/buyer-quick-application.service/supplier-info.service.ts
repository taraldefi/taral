import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipService } from 'src/modules/relationship/services/relationship.service';
import { SupplierService } from 'src/modules/supplier/services/supplier.service';
import { QuickApplicationEntity } from '../../models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { CreateSupplierInformationRequest } from '../../dto/request/create-supplier-info.dto';
import { UpdateSupplierInformationRequest } from '../../dto/request/update-supplier-info.dto';
import { BuyerService } from 'src/modules/buyer/services/buyer.service';
import { BuyerQuickApplicationMappingService } from './mapping.service';
import { SupplierInformationResponse } from '../../dto/response/get-supplier-information-response.dto';
import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';

@Injectable()
export class BuyerQuickApplicationSupplierInformationService extends BaseService {
  constructor(
    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly mappingService: BuyerQuickApplicationMappingService,
    private readonly supplierService: SupplierService,
    private readonly relationshipService: RelationshipService,
    private readonly buyerService: BuyerService,
  ) {
    super();
  }

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

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createSupplierInformation(
    data: CreateSupplierInformationRequest,
    applicationId: string,
  ): Promise<SupplierInformationResponse> {
    this.setupTransactionHooks();

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
    if (application.supplierInformation) {
      throw new HttpException(
        'Supplier information already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

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

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateSupplierInformation(
    applicationId: string,
    data: UpdateSupplierInformationRequest,
  ): Promise<SupplierInformationResponse> {
    this.setupTransactionHooks();

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

    const updatedSupplier = await this.supplierService.updateEntity(
      application.supplierInformation.id,
      data.supplierInformation,
    );

    const updatedRelationship = await this.relationshipService.updateEntity(
      data.relationshipWithSupplier,
      buyer.relationshipWithSuppliers[0].id,
      application.buyerInformation.id,
      supplier.id,
    );

    return this.mappingService.mapSupplierInformationForImporterApplication(
      updatedSupplier,
      updatedRelationship,
    );
  }
}
