import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuyerQuickApplicationService } from '../services/buyer.quickapplication.service';
import { BuyerEntityService } from 'src/modules/entity/services/buyer-entity.service';
import { CreateQuickApplicationRequest } from '../dto/request/create-quick-application.dto';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { CreateBuyerRequest } from 'src/modules/buyer/dto/request/create-buyer.dto';

@ApiTags('Applications')
@Controller({
  path: 'quick-applications',
  version: '1',
})
export class QuickApplicationController {
  constructor(
    private readonly buyerQuickApplicationService: BuyerQuickApplicationService,
    private readonly entityService: BuyerEntityService,
  ) {}

  //   @Get('/:id')
  //   async get(@Param('id') id: string) {
  //     return await this.orderProductService.get(id);
  //   }

  @Post()
  async create(@Body() applicationDto: CreateQuickApplicationRequest) {
    const entity = await this.entityService.findBuyerEntityById(
      applicationDto.entityId,
    );
    const application = await this.buyerQuickApplicationService.create(
      applicationDto,
      entity,
    );
    return application;
  }

  @Post('/:id/order-details')
  async createOrder(
    @Param('id') applicationId: string,
    @Body() orderDetailDto: CreateOrderDetailDto,
  ) {
    const orderDetail =
      await this.buyerQuickApplicationService.createOrderDetail(
        orderDetailDto,
        applicationId,
      );
    return orderDetail;
  }

  @Post('/:id/buyer-info')
  async createBuyerInfo(
    @Param('id') applicationId: string,
    @Body() buyerInfo: CreateBuyerRequest,
  ) {
    const buyerInformation =
      await this.buyerQuickApplicationService.createBuyerInformation(
        buyerInfo,
        applicationId,
      );
    return buyerInformation;
  }

  //   @Patch('/:id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body() updateOrderProduct: UpdateOrderProductDto,
  //   ) {
  //     return await this.orderProductService.update(id, updateOrderProduct);
  //   }

  //   @Delete('/:id')
  //   async delete(@Param('id') id: string) {
  //     await this.orderProductService.delete(id);
  //   }
}
