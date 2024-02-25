import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetApplicationResponse } from 'src/modules/company/dto/response/get-application-response.dto';
import { CreateQuickApplicationRequest } from '../../dto/request/create-quick-application.dto';
import { CreateBuyerQuickApplicationResponse } from '../../dto/response/create-buyer-application-response.dto';
import { GetBuyerQuickApplicationResponse } from '../../dto/response/get-buyer-quick-application-response.dto';
import { QuickApplicationEntity } from '../../models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { CollateralService } from 'src/modules/collateral/services/collateral.service';
import { PaymentTermService } from 'src/modules/payment-term/services/payment-term.service';
import { OrderDetailService } from 'src/modules/order-detail/services/order-detail.service';
import { BuyerInformationService } from 'src/modules/company-information/services/buyer-information.service';
import { ConfigService } from '@nestjs/config';
import { SupplierInformationService } from 'src/modules/company-information/services/supplier-information.service';
import { StripeService } from './stripe.service';
import { BuyerCompanyEntityService } from 'src/modules/company/services/buyer-entity.service';
import { SubmitApplicationForCreditCardRequest } from '../../dto/request/submit-application-for-credit-card.dto';

@Injectable()
export class BuyerQuickApplicationService extends BaseService {
  constructor(
    public configService: ConfigService,
    private stripeService: StripeService,

    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,

    private buyerInformationService: BuyerInformationService,
    private buyerCompanyEntityService: BuyerCompanyEntityService,
    private supplierInfoService: SupplierInformationService,
    private paymentTermService: PaymentTermService,
    private orderDetailService: OrderDetailService,
    private collateralService: CollateralService,
  ) {
    super(configService);
  }

  public async getAllApplications(
    entityID: string,
  ): Promise<GetApplicationResponse[]> {
    const applications = await this.buyerApplicationRepository.find({
      select: [
        'id',
        'issuanceDate',
        'title',
        'status',
        'applicationNumber',
        'endDate',
        'exporterName',
      ],

      where: { company: { id: entityID } },
    });

    var response = new Array<GetApplicationResponse>();

    response = applications.map((application) => {
      var applicationItem = new GetApplicationResponse();
      applicationItem.id = application.id;
      applicationItem.issuanceDate = application.issuanceDate;
      applicationItem.title = application.title;
      applicationItem.applicationNumber = application.applicationNumber;
      applicationItem.exporterName = application.exporterName;
      applicationItem.endDate = application.endDate;
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
    response.applicationNumber = application.applicationNumber;
    response.issuanceDate = application.issuanceDate;
    response.endDate = application.endDate;
    response.status = application.status;
    response.sellerPrincipal = application.sellerPrincipal;
    response.transactionId = application.purchaseOrderId;
    response.paymentMethod = application.paymentMethod;

    const savedBuyerInformation = await this.buyerInformationService.get(
      application.id,
    );

    const savedPaymentTerm = await this.paymentTermService.get(application.id);
    const savedOrderDetail = await this.orderDetailService.get(application.id);
    const savedCollateral = await this.collateralService.get(application.id);
    response.exporterName = application.exporterName;

    response.buyerInformation = savedBuyerInformation;

    response.orderDetails = savedOrderDetail;
    response.security = savedCollateral;
    response.paymentTerms = savedPaymentTerm;

    return response;
  }

  public async findApplicationById(
    id: string,
  ): Promise<QuickApplicationEntity> {
    const application = await this.buyerApplicationRepository.findOneOrFail(
      id,
      {
        relations: [
          'buyerInformation',
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
    entity: BuyerCompanyEntity,
  ): Promise<CreateBuyerQuickApplicationResponse> {
    await this.checkActiveApplicationExists(entity.id);

    this.setupTransactionHooks();

    const application = new QuickApplicationEntity();

    const applicationNumber = await this.generateApplicationNumber(entity.name);
    // default enddate is 90 days from now
    const endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    application.applicationNumber = applicationNumber;
    application.title = data.title;
    application.issuanceDate = new Date();
    application.endDate = endDate;
    application.status = 'ACTIVE';
    application.createdAt = new Date();
    application.exporterName = '--';
    application.onchainPrincipal = data.onChainPrincipal;
    application.paymentMethod = data.paymentMethod;

    const savedApplication = await this.buyerApplicationRepository.save(
      application,
    );

    entity.applications = [...entity.applications, savedApplication];
    await entity.save();

    return savedApplication;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async insertPurchaseOrderTxId(
    id: string,
    txId: string,
  ): Promise<void> {
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

    application.purchaseOrderId = txId;
    application.save();
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

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async markAsCompleteForCreditCard(
    id: string,
    applicationDto: SubmitApplicationForCreditCardRequest,
  ): Promise<string> {
    this.setupTransactionHooks();

    const application = await this.findApplicationById(id);

    // check if an application is valid and completed
    const isComplete = await this.checkIfApplicationIsComplete(application);
    if (!isComplete)
      throw new HttpException('Invalid application', HttpStatus.BAD_REQUEST);

    if (application.status == 'ON_REVIEW')
      throw new HttpException(
        'Application already submited',
        HttpStatus.BAD_REQUEST,
      );

    const buyerCustomer = await this.stripeService.createCustomer(
      applicationDto.entityId,
      applicationDto.entityName,
      application.buyerInformation.email,
    );

    const poPrice = await this.stripeService.createPrice(
      parseInt(application.paymentTerms.balanceAmount) +
        parseInt(application.paymentTerms.downpaymentAmount),
      application.paymentTerms.id,
    );

    const createAndSendInvoice = await this.stripeService.createAndSendInvoice(
      buyerCustomer.id,
      poPrice.id,
    );

    application.status = 'ON_REVIEW';
    application.save();

    return createAndSendInvoice.hosted_invoice_url;
  }

  public async getActiveApplicationId(
    entityId: string,
  ): Promise<QuickApplicationEntity> {
    const application = await this.buyerApplicationRepository.findOneOrFail({
      where: { status: 'ACTIVE', company: { id: entityId } },
    });

    return application;
  }

  private async checkIfApplicationIsComplete(
    application: QuickApplicationEntity,
  ): Promise<boolean> {
    if (
      application.buyerInformation &&
      application.paymentTerms &&
      application.orderDetails &&
      application.security
    ) {
      return true;
    }

    return false;
  }

  private async checkActiveApplicationExists(entityId: string): Promise<void> {
    const activeApplication = await this.buyerApplicationRepository.findOne({
      where: { status: 'ACTIVE', company: { id: entityId } },
    });

    if (activeApplication && activeApplication.id) {
      throw new HttpException(
        'An active application exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private generateApplicationNumber(entityName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const lastFourDigits = Date.now().toString().slice(-4);
      const applicationNumber = `${entityName
        .substring(0, 3)
        .toUpperCase()}-${lastFourDigits}`;
      resolve(applicationNumber);
    });
  }
}
