import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderProductDto } from '../dto/request/create-order-product.dto';
import { OrderProductEntity } from '../models/order-product.entity';
import { OrderProductsRepository } from '../repositories/order-products.repository';
import { OrderDetailEntity } from '../models/order-detail.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private orderProductsRepository: OrderProductsRepository,
  ) {}

  async creatProduct(product: CreateOrderProductDto, order: OrderDetailEntity) {
    const newProduct = await this.orderProductsRepository.save(product);
    order.products = [...order.products, newProduct];
    await order.save();
    return newProduct;
  }
}
