import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { GetOrderDetailsResponse } from 'src/modules/order-detail/dto/response/get-order-detail-response.dto';
import { OrderDetailService } from 'src/modules/order-detail/services/order-detail.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { CreateOrderProductDto } from 'src/modules/order-detail/dto/request/create-order-product.dto';
import { OrderProductService } from 'src/modules/order-detail/services/order-product.service';
import { GetOrderProductResponse } from 'src/modules/order-detail/dto/response/get-order-product-response.dto';
import { UpdateOrderDetailDto } from 'src/modules/order-detail/dto/request/update-order-detail.dto';
import { UpdateOrderProductDto } from 'src/modules/order-detail/dto/request/update-order-product.dto';

@Injectable()
export class BuyerQuickApplicationOrderDetailService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly orderDetailsService: OrderDetailService,
    private readonly orderProductService: OrderProductService,
  ) {}

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

    return savedOrder;
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
    const savedOrder = await this.orderDetailsService.update(
      application.orderDetails.id,
      data,
    );

    return savedOrder;
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
    const savedOrder = await this.orderProductService.create(
      data,
      application.orderDetails.id,
    );

    return savedOrder;
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
