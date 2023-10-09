import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBuyerRequest } from 'src/modules/buyer/dto/request/create-buyer.dto';
import { CreateCollateralDto } from 'src/modules/collateral/dto/request/create-collateral.dto';
import { BuyerEntityService } from 'src/modules/entity/services/buyer-entity.service';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { CreateQuickApplicationRequest } from '../dto/request/create-quick-application.dto';
import { BuyerQuickApplicationService } from '../services/buyer.quickapplication.service';
import { CreateSupplierRequest } from 'src/modules/supplier/dto/request/create-supplier.dto';
import { CreateSupplierInformationRequest } from '../dto/request/create-supplier-info.dto';

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

  @Post('/:id/:buyerId/supplier-info')
  async createSupplierInfo(
    @Param('id') applicationId: string,
    @Param('buyerId') buyerId: string,
    @Body() supplierInfo: CreateSupplierInformationRequest,
  ) {
    const supplierInformation =
      await this.buyerQuickApplicationService.createSupplierInformation(
        supplierInfo,
        applicationId,
        buyerId,
      );
    return supplierInformation;
  }

  @Post('/:id/security')
  async createCollateral(
    @Param('id') applicationId: string,
    @Body() securityInfo: CreateCollateralDto,
  ) {
    const collateral = await this.buyerQuickApplicationService.createCollateral(
      securityInfo,
      applicationId,
    );
    return collateral;
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
