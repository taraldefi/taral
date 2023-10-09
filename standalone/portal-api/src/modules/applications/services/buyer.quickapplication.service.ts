import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { triggerError } from 'src/common/trigger.error';
import { CreateBuyerRequest } from 'src/modules/buyer/dto/request/create-buyer.dto';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';
import { BuyerService } from 'src/modules/buyer/services/buyer.service';
import { CreateCollateralDto } from 'src/modules/collateral/dto/request/create-collateral.dto';
import { CollateralEntity } from 'src/modules/collateral/models/collaterals.entity';
import { CollateralService } from 'src/modules/collateral/services/collateral.service';
import { LegalBuyerEntity } from 'src/modules/entity/models/legal-buyer-entity.entity';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { GetOrderDetailsResponse } from 'src/modules/order-detail/dto/response/get-order-detail-response.dto';
import { OrderDetailService } from 'src/modules/order-detail/services/order-detail.service';
import { CreateQuickApplicationRequest } from '../dto/request/create-quick-application.dto';
import { CreateBuyerQuickApplicationResponse } from '../dto/response/create-buyer-application-response.dto';
import { BuyerQuickApplicationEntity } from '../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../repositories/buyer.quickapplication.repository';
import { CreateSupplierRequest } from 'src/modules/supplier/dto/request/create-supplier.dto';
import { SupplierService } from 'src/modules/supplier/services/supplier.service';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { CreateSupplierInformationRequest } from '../dto/request/create-supplier-info.dto';
import { RelationshipService } from 'src/modules/relationship/services/relationship.service';

@Injectable()
export class BuyerQuickApplicationService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly orderDetailsService: OrderDetailService,
    private readonly buyerService: BuyerService,
    private readonly collateralService: CollateralService,
    private readonly supplierService: SupplierService,
    private readonly relationshipService: RelationshipService,
  ) {}

  public async findApplicationById(
    id: string,
  ): Promise<BuyerQuickApplicationEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const application = await this.buyerApplicationRepository.findOne(id, {
      relations: [
        'buyerInformation',
        'supplierInformation',
        'paymentTerms',
        'orderDetails',
        'security',
        'transactionDocuments',
      ],
    });

    if (!application) throw triggerError('entity-not-found');

    return application;
  }

  public async create(
    data: CreateQuickApplicationRequest,
    entity: LegalBuyerEntity,
  ): Promise<CreateBuyerQuickApplicationResponse> {
    const application = new BuyerQuickApplicationEntity();

    application.title = data.title;
    application.issuanceDate = new Date();
    application.status = 'ACTIVE';
    application.createdAt = new Date();

    const savedApplication = await this.buyerApplicationRepository.save(
      application,
    );

    entity.legalApplications = [...entity.legalApplications, savedApplication];
    entity.save();

    return savedApplication;
  }

  public async createOrderDetail(
    data: CreateOrderDetailDto,
    applicationId: string,
  ): Promise<GetOrderDetailsResponse> {
    const savedOrder = await this.orderDetailsService.create(data);
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
    application.orderDetails = savedOrder;
    application.save();

    return savedOrder;
  }

  public async createBuyerInformation(
    data: CreateBuyerRequest,
    applicationId: string,
  ): Promise<BuyerEntity> {
    const savedBuyer = await this.buyerService.createEntity(data);
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
    application.buyerInformation = savedBuyer;
    application.save();

    return savedBuyer;
  }

  public async createSupplierInformation(
    data: CreateSupplierInformationRequest,
    applicationId: string,
    buyerId: string,
  ): Promise<SupplierEntity> {
    const savedSupplier = await this.supplierService.createEntity(
      data.supplierInformation,
    );

    const savedRelationship = await this.relationshipService.createEntity(
      data.relationshipWithSupplier,
      buyerId,
      savedSupplier.id,
    );
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
    application.supplierInformation = savedSupplier;
    application.buyerInformation.relationshipWithSuppliers = [
      savedRelationship,
    ];

    application.save();

    return savedSupplier;
  }

  public async createCollateral(
    data: CreateCollateralDto,
    applicationId: string,
  ): Promise<CollateralEntity> {
    const savedCollateral = await this.collateralService.create(data);
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
    application.security = savedCollateral;
    application.save();

    return savedCollateral;
  }

  //   public async get(id: string): Promise<GetOrderDetailsResponse> {
  //     if (!id) throw triggerError('missing-entity-id');

  //     const order = await this.orderDetailsRepository.findOne(id, {
  //       relations: ['products'],
  //     });
  //     if (!order) throw triggerError('entity-not-found');

  //     return this.orderDetailMappingService.mapOrderDetails(order);
  //   }

  //   public async update(
  //     id: string,
  //     data: UpdateOrderDetailDto,
  //   ): Promise<GetOrderDetailsResponse> {
  //     if (!id) throw triggerError('missing-entity-id');

  //     const order = await this.orderDetailsRepository.findOne(id, {
  //       relations: ['products'],
  //     });

  //     if (!order) throw triggerError('entity-not-found');

  //     if (data.importPort) {
  //       order.importPort = data.importPort;
  //     }
  //     if (data.exportPort) {
  //       order.exportPort = data.exportPort;
  //     }

  //     const updatedOrder = await this.orderDetailsRepository.save(order);

  //     return this.orderDetailMappingService.mapOrderDetails(updatedOrder);
  //   }

  //   public async delete(id: string) {
  //     if (!id) throw triggerError('missing-entity-id');

  //     const order = await this.orderDetailsRepository.findOne({
  //       where: { id: id },
  //       relations: ['products'],
  //     });

  //     if (!order) throw triggerError('entity-not-found');

  //     await this.orderDetailsRepository.delete({ id: id });
  //   }

  //   public async getAll(): Promise<GetOrderDetailsResponse[]> {
  //     const orders = await this.orderDetailsRepository.find({
  //       relations: ['products'],
  //     });

  //     return orders.map((order) => {
  //       return this.orderDetailMappingService.mapOrderDetails(order);
  //     });
  //   }
}
