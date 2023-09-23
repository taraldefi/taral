import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from '../dto/request/create-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { GetOrderDetailsResponse } from '../dto/response/get-order-detail-response.dto';
import { OrderProductService } from './order-product.service';
import { OrderDetailMappingService } from './mapping.service';

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
  async createOrder(
    data: CreateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    const order = new OrderDetailEntity();

    order.importPort = data.importPort;
    order.exportPort = data.exportPort;
    const savedOrder = await this.orderDetailsRepository.save(order);
    return savedOrder;
  }
  public async getorder(id: string): Promise<GetOrderDetailsResponse> {
    const order = await this.orderDetailsRepository.findOne(id, {
      relations: ['products'],
    });
    return this.orderDetailMappingService.mapOrderDetails(order);
  }

  public async getAllOrders(): Promise<GetOrderDetailsResponse[]> {
    return await this.orderDetailsRepository.find({
      relations: ['products'],
    });
  }
}
