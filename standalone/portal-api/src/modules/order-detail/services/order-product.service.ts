import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderProductDto } from '../dto/request/create-order-product.dto';
import { OrderProductEntity } from '../models/order-product.entity';
import { OrderProductsRepository } from '../repositories/order-products.repository';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { UpdateOrderProductDto } from '../dto/request/update-order-product.dto';
import { OrderDetailMappingService } from './mapping.service';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private orderProductsRepository: OrderProductsRepository,
    private readonly orderDetailMappingService: OrderDetailMappingService,
  ) {}

  async creatProduct(product: CreateOrderProductDto, order: OrderDetailEntity) {
    const newProduct = await this.orderProductsRepository.save(product);
    order.products = [...order.products, newProduct];
    await order.save();

    return this.orderDetailMappingService.mapOrderProductDetails(newProduct);
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

  async deleteProduct(id: string) {
    const product = await this.orderProductsRepository.findOneOrFail({
      where: { id: id },
    });
    await this.orderProductsRepository.delete({ id: id });
  }
}
