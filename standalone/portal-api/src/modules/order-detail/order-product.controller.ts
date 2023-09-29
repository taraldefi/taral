import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderProductDto } from './dto/request/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/request/update-order-product.dto';
import { OrderDetailService } from './services/order-detail.service';
import { OrderProductService } from './services/order-product.service';

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

  @Get('/:id')
  async get(@Param('id') id: string) {
    return await this.orderProductService.get(id);
  }

  @Post()
  async create(@Body() createOrderProduct: CreateOrderProductDto) {
    const order = await this.orderDetailService.findOrderById(
      createOrderProduct.orderId,
    );
    const product = await this.orderProductService.create(
      createOrderProduct,
      order,
    );
    return product;
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderProduct: UpdateOrderProductDto,
  ) {
    return await this.orderProductService.update(id, updateOrderProduct);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.orderProductService.delete(id);
  }
}
