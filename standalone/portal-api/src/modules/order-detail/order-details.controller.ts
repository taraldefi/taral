import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './dto/request/create-order-detail.dto';
import { GetOrderDetailsResponse } from './dto/response/get-order-detail-response.dto';
import { OrderDetailService } from './services/order-detail.service';
import { OrderDetailMappingService } from './services/mapping.service';

@ApiTags('Orders')
@Controller({
  path: 'order',
  version: '1',
})
export class OrderDetailsController {
  constructor(
    private readonly orderDetailsService: OrderDetailService,
    private mappingService: OrderDetailMappingService,
  ) {}
  @Post()
  async createOrder(
    @Body() order: CreateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    return await this.orderDetailsService.createOrder(order);
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderDetailsService.getorder(id);
  }

  @Get('')
  async getAllOrders(): Promise<GetOrderDetailsResponse[]> {
    return await this.orderDetailsService.getAllOrders();
  }
}
