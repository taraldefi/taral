import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { CreateOrderProductDto } from 'src/modules/order-detail/dto/request/create-order-product.dto';
import { UpdateOrderDetailDto } from 'src/modules/order-detail/dto/request/update-order-detail.dto';
import { UpdateOrderProductDto } from 'src/modules/order-detail/dto/request/update-order-product.dto';
import { GetOrderDetailsResponse } from 'src/modules/order-detail/dto/response/get-order-detail-response.dto';
import { GetOrderProductResponse } from 'src/modules/order-detail/dto/response/get-order-product-response.dto';
import { OrderDetailMappingService } from 'src/modules/order-detail/services/mapping.service';
import { OrderDetailService } from 'src/modules/order-detail/services/order-detail.service';
import { OrderProductService } from 'src/modules/order-detail/services/order-product.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';

@Injectable()
export class BuyerQuickApplicationOrderDetailService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly orderDetailsService: OrderDetailService,
    private readonly orderProductService: OrderProductService,
    private readonly mappingService: OrderDetailMappingService,
  ) {}

  public async getOrderDetails(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );
    const order = await this.orderDetailsService.findOrderById(
      application.orderDetails.id,
    );

    return this.mappingService.mapOrderDetails(order);
  }

  public async createOrderDetail(
    data: CreateOrderDetailDto,
    applicationId: string,
  ): Promise<GetOrderDetailsResponse> {
    const savedOrder = await this.orderDetailsService.create(data);
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );
    application.orderDetails = savedOrder;
    application.save();

    return this.mappingService.mapOrderDetails(application.orderDetails);
  }

  public async updateOrderDetail(
    data: UpdateOrderDetailDto,
    applicationId: string,
  ): Promise<GetOrderDetailsResponse> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );
    return await this.orderDetailsService.update(
      application.orderDetails.id,
      data,
    );
  }

  public async addProductsToOrderDetail(
    data: CreateOrderProductDto,
    applicationId: string,
  ): Promise<GetOrderProductResponse> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );
    return await this.orderProductService.create(
      data,
      application.orderDetails.id,
    );
  }

  public async updateProductsToOrderDetail(
    data: UpdateOrderProductDto,
    applicationId: string,
    productId: string,
  ): Promise<GetOrderProductResponse> {
    const savedProduct = await this.orderProductService.update(productId, data);
    return savedProduct;
  }

  public async deleteProductsToOrderDetail(
    applicationId: string,
    productId: string,
  ): Promise<void> {
    await this.orderProductService.delete(productId);
  }
}
