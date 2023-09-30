import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from '../dto/request/create-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { GetOrderDetailsResponse } from '../dto/response/get-order-detail-response.dto';
import { OrderDetailMappingService } from './mapping.service';
import { UpdateOrderDetailDto } from '../dto/request/update-order-detail.dto';
import { triggerError } from 'src/modules/entity/utils/trigger.error';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private orderDetailsRepository: OrderDetailsRepository,
    private orderDetailMappingService: OrderDetailMappingService,
  ) {}

  public async findOrderById(id: string): Promise<OrderDetailEntity> {
    if (!id) throw triggerError('missing-entity-id');

    const order = await this.orderDetailsRepository.findOne(id, {
      relations: ['products'],
    });

    if (!order) throw triggerError('entity-not-found');

    return order;
  }

  public async create(
    data: CreateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    const order = new OrderDetailEntity();

    order.importPort = data.importPort;
    order.exportPort = data.exportPort;
    order.products = [];

    const savedOrder = await this.orderDetailsRepository.save(order);

    return this.orderDetailMappingService.mapOrderDetails(savedOrder);
  }

  public async get(id: string): Promise<GetOrderDetailsResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const order = await this.orderDetailsRepository.findOne(id, {
      relations: ['products'],
    });
    if (!order) throw triggerError('entity-not-found');

    return this.orderDetailMappingService.mapOrderDetails(order);
  }

  public async update(
    id: string,
    data: UpdateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const order = await this.orderDetailsRepository.findOne(id, {
      relations: ['products'],
    });

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
