import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './dto/request/create-order-detail.dto';
import { GetOrderDetailsResponse } from './dto/response/get-order-detail-response.dto';
import { OrderDetailService } from './services/order-detail.service';
import { OrderProductService } from './services/order-product.service';
import { CreateOrderProductDto } from './dto/request/create-order-product.dto';

@ApiTags('Orders')
@Controller({
  path: 'order/product',
  version: '1',
})
export class OrderProductController {
  constructor(
    private readonly orderProductService: OrderProductService,
    private readonly orderDetailService: OrderDetailService,
  ) {}
  @Post()
  async saveProductToOrder(@Body() createOrderProduct: CreateOrderProductDto) {
    const order = await this.orderDetailService.findOrderById(
      createOrderProduct.orderId,
    );
    const product = await this.orderProductService.creatProduct(
      createOrderProduct,
      order,
    );
    return product;
  }
}
