import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipService } from 'src/modules/relationship/services/relationship.service';

import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { SupplierInformationResponse } from '../dto/response/supplier/get-supplier-response.dto';
import { CreateSupplierInformationRequest } from '../dto/request/supplier/create-supplier-company.dto';
import { SupplierCompanyEntityService } from 'src/modules/company/services/supplier-entity.service';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { EntityMappingService } from './mapping.service';
import { UpdateSupplierInformationRequest } from '../dto/request/supplier/update-supplier-company.dto';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { BuyerCompanyEntityRepository } from 'src/modules/company/repositories/buyer.company.repository';
import { triggerError } from 'src/common/trigger.error';

@Injectable()
export class SupplierInformationService extends BaseService {
  constructor(
    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,

    @InjectRepository(BuyerCompanyEntity)
    private buyerCompanyRepository: BuyerCompanyEntityRepository,

    private readonly mappingService: EntityMappingService,
    private readonly supplierService: SupplierCompanyEntityService,
    private readonly relationshipService: RelationshipService,
  ) {
    super();
  }

  public async getSupplierInformation(
    applicationId: string,
  ): Promise<SupplierInformationResponse> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['supplierInformation'],
      },
    );

    const savedSupplier = await this.supplierService.getSupplierEntity(
      application.supplierInformation.id,
    );

    const savedRelationship = await this.relationshipService.getEntity(
      application.company.id,
      application.supplierInformation.id,
    );

    return this.mappingService.mapSupplierInformationForImporterApplication(
      savedSupplier.id,
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

    const selectedSupplier = await this.supplierService.findSupplierEntityById(
      data.supplierId,
    );

    const savedRelationship = await this.relationshipService.createEntity(
      data.relationshipWithSupplier,
      application.company.id,
      selectedSupplier,
    );

    selectedSupplier.relationshipWithBuyers = [
      ...selectedSupplier.relationshipWithBuyers,
      savedRelationship,
    ];

    selectedSupplier.applications = [
      ...selectedSupplier.applications,
      application,
    ];

    selectedSupplier.save();
    application.supplierInformation = selectedSupplier;
    await this.buyerApplicationRepository.save(application);

    return this.mappingService.mapSupplierInformationForImporterApplication(
      selectedSupplier.id,
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
        relations: ['supplierInformation'],
      },
    );

    const buyer = await this.buyerCompanyRepository.findOneOrFail({
      relations: ['relationshipWithSuppliers'],
      where: { id: application.company.id },
    });

    const supplier = await this.supplierService.findSupplierEntityById(
      data.supplierId,
    );

    if (!supplier) throw triggerError('entity-not-found');

    application.supplierInformation = supplier;
    application.save();

    const updatedRelationship = await this.relationshipService.updateEntity(
      data.relationshipWithSupplier,
      buyer.relationshipWithSuppliers[0].id,
      application.company.id,
      supplier,
    );

    return this.mappingService.mapSupplierInformationForImporterApplication(
      supplier.id,
      updatedRelationship,
    );
  }
}
