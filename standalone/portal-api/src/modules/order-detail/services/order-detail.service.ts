import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from '../dto/request/create-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { GetOrderDetailsResponse } from '../dto/response/get-order-detail-response.dto';
import { OrderDetailMappingService } from './mapping.service';
import { UpdateOrderDetailDto } from '../dto/request/update-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private orderDetailsRepository: OrderDetailsRepository,
    private orderDetailMappingService: OrderDetailMappingService,
  ) {}
  async findOrderById(id: string): Promise<OrderDetailEntity> {
    return await this.orderDetailsRepository.findOne(id, {
      relations: ['products'],
    });
  }
  async create(data: CreateOrderDetailDto): Promise<GetOrderDetailsResponse> {
    const order = new OrderDetailEntity();

    order.importPort = data.importPort;
    order.exportPort = data.exportPort;
    order.products = [];
    const savedOrder = await this.orderDetailsRepository.save(order);
    return this.orderDetailMappingService.mapOrderDetails(savedOrder);
  }
  async get(id: string): Promise<GetOrderDetailsResponse> {
    const order = await this.orderDetailsRepository.findOne(id, {
      relations: ['products'],
    });
    return this.orderDetailMappingService.mapOrderDetails(order);
  }

  async update(
    id: string,
    data: UpdateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    const order = await this.orderDetailsRepository.findOneOrFail(id, {
      relations: ['products'],
    });
    if (data.importPort) {
      order.importPort = data.importPort;
    }
    if (data.exportPort) {
      order.exportPort = data.exportPort;
    }
    const updatedOrder = await this.orderDetailsRepository.save(order);
    return this.orderDetailMappingService.mapOrderDetails(updatedOrder);
  }

  async delete(id: string) {
    const order = await this.orderDetailsRepository.findOneOrFail({
      where: { id: id },
      relations: ['products'],
    });
    await this.orderDetailsRepository.delete({ id: id });
  }

  async getAll(): Promise<GetOrderDetailsResponse[]> {
    const orders = await this.orderDetailsRepository.find({
      relations: ['products'],
    });
    return orders.map((order) => {
      return this.orderDetailMappingService.mapOrderDetails(order);
    });
  }
}
