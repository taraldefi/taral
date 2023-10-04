import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderProductDto } from '../dto/request/create-order-product.dto';
import { OrderProductEntity } from '../models/order-product.entity';
import { OrderProductsRepository } from '../repositories/order-products.repository';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { UpdateOrderProductDto } from '../dto/request/update-order-product.dto';
import { OrderDetailMappingService } from './mapping.service';
import { triggerError } from 'src/modules/entity/utils/trigger.error';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private orderProductsRepository: OrderProductsRepository,
    private readonly orderDetailMappingService: OrderDetailMappingService,
  ) {}

  public async get(id: string) {
    if (!id) throw triggerError('missing-entity-id');

    const product = await this.orderProductsRepository.findOne(id);

    if (!product) throw triggerError('entity-not-found');

    return this.orderDetailMappingService.mapOrderProductDetails(product);
  }

  public async create(
    product: CreateOrderProductDto,
    order: OrderDetailEntity,
  ) {
    const newProduct = await this.orderProductsRepository.save(product);

    order.products = [...order.products, newProduct];
    await order.save();

    return this.orderDetailMappingService.mapOrderProductDetails(newProduct);
  }

  public async update(id: string, productData: UpdateOrderProductDto) {
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
