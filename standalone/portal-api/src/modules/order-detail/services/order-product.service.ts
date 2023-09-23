import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderProductDto } from '../dto/request/create-order-product.dto';
import { OrderProductEntity } from '../models/order-product.entity';
import { OrderProductsRepository } from '../repositories/order-products.repository';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { UpdateOrderProductDto } from '../dto/request/update-order-product.dto';

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

  async updateProduct(id: string, productData: UpdateOrderProductDto) {
    const product = await this.orderProductsRepository.findOneOrFail(id);

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
    return updatedProduct;
  }
}
