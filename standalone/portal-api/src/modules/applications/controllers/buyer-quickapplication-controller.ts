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
import { BuyerQuickApplicationService } from '../services/buyer.quickapplication.service';
import { BuyerEntityService } from 'src/modules/entity/services/entity.service';
import { CreateQuickApplicationRequest } from '../dto/request/create-quick-application.dto';

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
