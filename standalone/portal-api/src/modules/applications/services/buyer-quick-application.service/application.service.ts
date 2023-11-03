import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GetApplicationResponse } from 'src/modules/entity/dto/response/get-application-response.dto';
import { LegalBuyerEntity } from 'src/modules/entity/models/legal-buyer-entity.entity';
import { CreateQuickApplicationRequest } from '../../dto/request/create-quick-application.dto';
import { CreateBuyerQuickApplicationResponse } from '../../dto/response/create-buyer-application-response.dto';
import { GetBuyerQuickApplicationResponse } from '../../dto/response/get-buyer-quick-application-response.dto';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { BuyerQuickApplicationBuyerInformationService } from './buyer-info.service';
import { BuyerQuickApplicationCollateralService } from './collaterals.service';
import { BuyerQuickApplicationOrderDetailService } from './order-details.service';
import { BuyerQuickApplicationPaymentTermService } from './payment-term.service';
import { BuyerQuickApplicationSupplierInformationService } from './supplier-info.service';
import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';

@Injectable()
export class BuyerQuickApplicationService extends BaseService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,

    private buyerInfoService: BuyerQuickApplicationBuyerInformationService,
    private supplierInfoService: BuyerQuickApplicationSupplierInformationService,
    private paymentTermService: BuyerQuickApplicationPaymentTermService,
    private orderDetailService: BuyerQuickApplicationOrderDetailService,
    private collateralService: BuyerQuickApplicationCollateralService,
  ) {
    super();
  }

  public async getAllApplications(
    entityID: string,
  ): Promise<GetApplicationResponse[]> {
    const applications = await this.buyerApplicationRepository.find({
      select: ['id', 'issuanceDate', 'title', 'status'],
      where: { legalEntity: { id: entityID } },
    });

    var response = new Array<GetApplicationResponse>();

    response = applications.map((application) => {
      var applicationItem = new GetApplicationResponse();
      applicationItem.id = application.id;
      applicationItem.issuanceDate = application.issuanceDate;
      applicationItem.title = application.title;
      applicationItem.status = application.status;

      return applicationItem;
    });

    return response;
  }

  public async get(id: string): Promise<GetApplicationResponse> {
    const application = await this.buyerApplicationRepository.findOneOrFail(
      id,
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
    var response = new GetBuyerQuickApplicationResponse();
    response.id = application.id;
    response.title = application.title;
    response.status = application.status;

    const savedBuyerInformation =
      await this.buyerInfoService.getBuyerInformation(application.id);
    const savedSupplierInformation =
      await this.supplierInfoService.getSupplierInformation(application.id);

    const savedPaymentTerm = await this.paymentTermService.getPaymentTerm(
      application.id,
    );
    const savedOrderDetail = await this.orderDetailService.getOrderDetails(
      application.id,
    );
    const savedCollateral = await this.collateralService.getCollateral(
      application.id,
    );

    response.buyerInformation = savedBuyerInformation;
    response.supplierInformation = savedSupplierInformation;
    response.orderDetails = savedOrderDetail;
    response.security = savedCollateral;
    response.paymentTerms = savedPaymentTerm;

    return response;
  }

  public async findApplicationById(
    id: string,
  ): Promise<BuyerQuickApplicationEntity> {
    const application = await this.buyerApplicationRepository.findOneOrFail(
      id,
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

    return application;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async create(
    data: CreateQuickApplicationRequest,
    entity: LegalBuyerEntity,
  ): Promise<CreateBuyerQuickApplicationResponse> {
    await this.checkActiveApplicationExists(entity.id);

    this.setupTransactionHooks();

    const application = new BuyerQuickApplicationEntity();

    application.title = data.title;
    application.issuanceDate = new Date();
    application.status = 'ACTIVE';
    application.createdAt = new Date();

    const savedApplication = await this.buyerApplicationRepository.save(
      application,
    );

    entity.legalApplications = [...entity.legalApplications, savedApplication];
    await entity.save();

    return savedApplication;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async markAsComplete(id: string): Promise<void> {
    this.setupTransactionHooks();

    const application = await this.findApplicationById(id);
    const isComplete = await this.checkIfApplicationIsComplete(application);
    if (!isComplete)
      throw new HttpException('Invalid application', HttpStatus.BAD_REQUEST);

    if (application.status == 'COMPLETED')
      throw new HttpException(
        'Application already submited',
        HttpStatus.BAD_REQUEST,
      );

    application.status = 'COMPLETED';
    application.save();
  }

  public async getActiveApplicationId(
    entityId: string,
  ): Promise<BuyerQuickApplicationEntity> {
    const application = await this.buyerApplicationRepository.findOneOrFail({
      where: { status: 'ACTIVE', legalEntity: { id: entityId } },
    });

    return application;
  }

  private async checkIfApplicationIsComplete(
    application: BuyerQuickApplicationEntity,
  ): Promise<boolean> {
    if (
      application.buyerInformation &&
      application.supplierInformation &&
      application.paymentTerms &&
      application.orderDetails &&
      application.security
      //application.transactionDocuments
    ) {
      return true;
    }

    return false;
  }

  private async checkActiveApplicationExists(entityId: string): Promise<void> {
    const activeApplication = await this.buyerApplicationRepository.findOne({
      where: { status: 'ACTIVE', legalEntity: { id: entityId } },
    });

    if (activeApplication && activeApplication.id) {
      throw new HttpException(
        'An active application exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
