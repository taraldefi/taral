import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderProductDto } from '../dto/request/create-order-product.dto';
import { OrderProductEntity } from '../models/order-product.entity';
import { OrderProductsRepository } from '../repositories/order-products.repository';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { UpdateOrderProductDto } from '../dto/request/update-order-product.dto';
import { OrderDetailMappingService } from './mapping.service';
import { triggerError } from 'src/common/trigger.error';
import { OrderDetailService } from './order-detail.service';
import { BaseService } from 'src/common/services/base.service';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { GetOrderProductResponse } from '../dto/response/get-order-product-response.dto';

@Injectable()
export class OrderProductService extends BaseService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private orderProductsRepository: OrderProductsRepository,
    private readonly orderDetailMappingService: OrderDetailMappingService,
    private readonly orderDetailService: OrderDetailService,

    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {
    super();
  }

  public async get(id: string) {
    if (!id) throw triggerError('missing-entity-id');

    const product = await this.orderProductsRepository.findOne(id);

    if (!product) throw triggerError('entity-not-found');

    return this.orderDetailMappingService.mapOrderProductDetails(product);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async create(
    product: CreateOrderProductDto,
    applicationId: string,
  ): Promise<GetOrderProductResponse> {
    this.setupTransactionHooks();

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
    const order = await this.orderDetailService.findOrderById(
      application.orderDetails.id,
    );

    const newProduct = await this.orderProductsRepository.save(product);

    order.products = [...order.products, newProduct];
    await order.save();

    return this.orderDetailMappingService.mapOrderProductDetails(newProduct);
  }

  public async update(
    id: string,
    productData: UpdateOrderProductDto,
  ): Promise<GetOrderProductResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const product = await this.orderProductsRepository.findOne(id);

    if (!product) throw triggerError('entity-not-found');

    if (productData.name) {
      product.name = productData.name;
    }
    if (productData.quantity) {
      product.quantity = productData.quantity;
    }
    if (productData.unitPrice) {
      product.unitPrice = productData.unitPrice;
    }

    const updatedProduct = await this.orderProductsRepository.save(product);

    return this.orderDetailMappingService.mapOrderProductDetails(
      updatedProduct,
    );
  }

  public async delete(id: string) {
    if (!id) throw triggerError('missing-entity-id');

    const product = await this.orderProductsRepository.findOne({
      where: { id: id },
    });

    if (!product) throw triggerError('entity-not-found');

    await this.orderProductsRepository.delete({ id: id });
  }
}
