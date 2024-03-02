import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from '../dto/request/create-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { GetOrderDetailsResponse } from '../dto/response/get-order-detail-response.dto';
import { OrderDetailMappingService } from './mapping.service';
import { UpdateOrderDetailDto } from '../dto/request/update-order-detail.dto';
import { triggerError } from 'src/common/trigger.error';
import { BaseService } from 'src/common/services/base.service';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderDetailService extends BaseService {
  constructor(
    public configService: ConfigService,

    @InjectRepository(OrderDetailEntity)
    private orderDetailsRepository: OrderDetailsRepository,
    private orderDetailMappingService: OrderDetailMappingService,

    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {
    super();
  }

  public async findOrderById(id: string): Promise<OrderDetailEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const order = await this.orderDetailsRepository.findOne(id, {
      relations: ['products'],
    });

    if (!order) throw triggerError('entity-not-found');

    return order;
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async create(
    data: CreateOrderDetailDto,
    applicationId: string,
  ): Promise<GetOrderDetailsResponse> {
    this.setupTransactionHooks();

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );

    if (application.orderDetails) {
      throw new HttpException(
        'order details already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = new OrderDetailEntity();

    order.importPort = data.importPort;
    order.exportPort = data.exportPort;

    order.products = [];

    const savedOrder = await this.orderDetailsRepository.save(order);
    application.orderDetails = savedOrder;
    application.save();

    return this.orderDetailMappingService.mapOrderDetails(savedOrder);
  }

  public async get(applicationId: string): Promise<GetOrderDetailsResponse> {
    if (!applicationId) throw triggerError('missing-entity-id');

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );
    if (!application.orderDetails) {
      throw new HttpException(
        'order details not found, create an order first',
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = await this.orderDetailsRepository.findOne(
      application.orderDetails.id,
      {
        relations: ['products'],
      },
    );
    if (!order) throw triggerError('entity-not-found');

    return this.orderDetailMappingService.mapOrderDetails(order);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async update(
    applicationId: string,
    data: UpdateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    this.setupTransactionHooks();

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );
    if (!applicationId) throw triggerError('missing-entity-id');

    const order = await this.orderDetailsRepository.findOne(
      application.orderDetails.id,
      {
        relations: ['products'],
      },
    );

    if (!order) throw triggerError('entity-not-found');

    if (data.importPort) {
      order.importPort = data.importPort;
    }
    if (data.exportPort) {
      order.exportPort = data.exportPort;
    }

    const updatedOrder = await this.orderDetailsRepository.save(order);

    return this.orderDetailMappingService.mapOrderDetails(updatedOrder);
  }

  public async delete(id: string) {
    if (!id) throw triggerError('missing-entity-id');

    const order = await this.orderDetailsRepository.findOne({
      where: { id: id },
      relations: ['products'],
    });

    if (!order) throw triggerError('entity-not-found');

    await this.orderDetailsRepository.delete({ id: id });
  }

  public async getAll(): Promise<GetOrderDetailsResponse[]> {
    const orders = await this.orderDetailsRepository.find({
      relations: ['products'],
    });

    return orders.map((order) => {
      return this.orderDetailMappingService.mapOrderDetails(order);
    });
  }
}
