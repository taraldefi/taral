import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './dto/request/create-order-detail.dto';
import { GetOrderDetailsResponse } from './dto/response/get-order-detail-response.dto';
import { OrderDetailService } from './services/order-detail.service';

@ApiTags('Orders')
@Controller({
  path: 'orders',
  version: '1',
})
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailService) {}
  @Post()
  async createOrder(
    @Body() order: CreateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    return await this.orderDetailsService.createOrder(order);
  }

  @Get('/:id')
  async getOrder(@Param('id') id) {
    return await this.orderDetailsService.getOrder(id);
  }

  @Get()
  async getAllOrders(): Promise<GetOrderDetailsResponse[]> {
    return await this.orderDetailsService.getAllOrders();
  }
}
