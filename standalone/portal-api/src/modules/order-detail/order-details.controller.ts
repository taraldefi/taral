import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderDetailDto } from './dto/request/update-order-detail.dto';
import { GetOrderDetailsResponse } from './dto/response/get-order-detail-response.dto';
import { OrderDetailService } from './services/order-detail.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Orders')
@Controller({
  path: 'order',
  version: '1',
})
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailService) {}
  // @Post()
  // async createOrder(
  //   @Body() order: CreateOrderDetailDto,
  // ): Promise<GetOrderDetailsResponse> {
  //   return await this.orderDetailsService.create(order);
  // }

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
