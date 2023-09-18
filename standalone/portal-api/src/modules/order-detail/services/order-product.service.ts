import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderProductDto } from '../dto/request/create-order-product.dto';
import { OrderProductEntity } from '../models/order-product.entity';
import { OrderProductsRepository } from '../repositories/order-products.repository';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private orderProductsRepository: OrderProductsRepository,
  ) {}

  async saveProductsToOrder(
    products: CreateOrderProductDto[],
  ): Promise<OrderProductEntity[]> {
    const result: OrderProductEntity[] = [];

    for (const item of products) {
      const product = new OrderProductEntity();
      product.name = item.name;
      product.quantity = item.quantity;
      product.unitPrice = item.unitPrice;
      try {
        await this.orderProductsRepository.save(product);
        result.push(product);
      } catch (error) {
        console.error('Error inserting into orderProducts:', error);
        throw error;
      }
    }
    return result;
  }
}
