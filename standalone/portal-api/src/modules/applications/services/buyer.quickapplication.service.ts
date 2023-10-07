import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { triggerError } from 'src/common/trigger.error';
import { CreateQuickApplicationRequest } from '../dto/request/create-quick-application.dto';
import { CreateBuyerQuickApplicationResponse } from '../dto/response/create-buyer-application-response.dto';
import { BuyerQuickApplicationEntity } from '../models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../repositories/buyer.quickapplication.repository';
import { LegalEntity } from 'src/modules/entity/models/legal-entity.entity';

@Injectable()
export class BuyerQuickApplicationService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {}

  public async findApplicationById(
    id: string,
  ): Promise<BuyerQuickApplicationEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const application = await this.buyerApplicationRepository.findOne(id, {
      relations: [
        'buyerInformation',
        'supplierInformation',
        'relationshipWithSupplier',
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
    entity: LegalEntity,
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
