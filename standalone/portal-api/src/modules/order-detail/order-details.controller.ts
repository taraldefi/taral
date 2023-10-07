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
import { CreateOrderDetailDto } from './dto/request/create-order-detail.dto';
import { GetOrderDetailsResponse } from './dto/response/get-order-detail-response.dto';
import { OrderDetailService } from './services/order-detail.service';
import { UpdateOrderDetailDto } from './dto/request/update-order-detail.dto';
import { BuyerQuickApplicationService } from '../applications/services/buyer.quickapplication.service';

@ApiTags('Orders')
@Controller({
  path: 'order',
  version: '1',
})
export class OrderDetailsController {
  constructor(
    private readonly orderDetailsService: OrderDetailService,
    private readonly buyerApplicationService: BuyerQuickApplicationService,
  ) {}
  @Post()
  async createOrder(
    @Body() order: CreateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    const application = await this.buyerApplicationService.findApplicationById(
      order.applicationId,
    );
    return await this.orderDetailsService.create(order, application);
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderDetailsService.get(id);
  }

  @Patch('/:id')
  async updateOrder(
    @Param('id') id: string,
    @Body() order: UpdateOrderDetailDto,
  ): Promise<GetOrderDetailsResponse> {
    return await this.orderDetailsService.update(id, order);
  }

  @Get('')
  async getAllOrders(): Promise<GetOrderDetailsResponse[]> {
    return await this.orderDetailsService.getAll();
  }

  @Delete('/:id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return await this.orderDetailsService.delete(id);
  }
}
