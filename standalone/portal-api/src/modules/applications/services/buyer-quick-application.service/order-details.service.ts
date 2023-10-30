import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';

@Injectable()
export class BuyerQuickApplicationOrderDetailService extends BaseService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly orderDetailsService: OrderDetailService,
    private readonly orderProductService: OrderProductService,
    private readonly mappingService: OrderDetailMappingService,
  ) {
    super();
  }

  public async getOrderDetails(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['orderDetails'],
      },
    );
    return this.orderDetailsService.get(application.orderDetails.id);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createOrderDetail(
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

    const savedOrder = await this.orderDetailsService.create(data);

    application.orderDetails = savedOrder;
    application.save();

    return this.mappingService.mapOrderDetails(application.orderDetails);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateOrderDetail(
    data: UpdateOrderDetailDto,
    applicationId: string,
  ): Promise<GetOrderDetailsResponse> {
    this.setupTransactionHooks();

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

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async addProductsToOrderDetail(
    data: CreateOrderProductDto,
    applicationId: string,
  ): Promise<GetOrderProductResponse> {
    this.setupTransactionHooks();

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
