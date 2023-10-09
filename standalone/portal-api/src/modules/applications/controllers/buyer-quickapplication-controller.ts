import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBuyerRequest } from 'src/modules/buyer/dto/request/create-buyer.dto';
import { CreateCollateralDto } from 'src/modules/collateral/dto/request/create-collateral.dto';
import { BuyerEntityService } from 'src/modules/entity/services/buyer-entity.service';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { CreateQuickApplicationRequest } from '../dto/request/create-quick-application.dto';

import { CreatePaymentTermDto } from 'src/modules/payment-term/dto/request/create-payment-term.dto';
import { CreateSupplierInformationRequest } from '../dto/request/create-supplier-info.dto';
import { BuyerQuickApplicationService } from '../services/buyer-quick-application.service/application.service';
import { BuyerQuickApplicationBuyerInformationService } from '../services/buyer-quick-application.service/buyer-info.service';
import { BuyerQuickApplicationCollateralService } from '../services/buyer-quick-application.service/collaterals.service';
import { BuyerQuickApplicationOrderDetailService } from '../services/buyer-quick-application.service/order-details.service';
import { BuyerQuickApplicationPaymentTermService } from '../services/buyer-quick-application.service/payment-term.service';
import { BuyerQuickApplicationSupplierInformationService } from '../services/buyer-quick-application.service/supplier-info.service';
import { UpdateBuyerRequest } from 'src/modules/buyer/dto/request/update-buyer.dto';
import { UpdateCollateralDto } from 'src/modules/collateral/dto/request/update-collateral.dto';

@ApiTags('Applications')
@Controller({
  path: 'quick-applications',
  version: '1',
})
export class QuickApplicationController {
  constructor(
    private readonly buyerQuickApplicationService: BuyerQuickApplicationService,
    private readonly entityService: BuyerEntityService,
    private readonly buyerQuickApplicationBuyerInformationService: BuyerQuickApplicationBuyerInformationService,
    private readonly buyerQuickApplicationASupplierInformationService: BuyerQuickApplicationSupplierInformationService,
    private readonly buyerQuickApplicationOrderDetailsService: BuyerQuickApplicationOrderDetailService,
    private readonly buyerQuickApplicationCollateralService: BuyerQuickApplicationCollateralService,
    private readonly buyerQuickApplicationpaymentTermService: BuyerQuickApplicationPaymentTermService,
  ) {}

  @Get('/:id')
  async getApplication(@Param('id') id: string) {
    return await this.buyerQuickApplicationService.findApplicationById(id);
  }

  @Get('/:entityId/active')
  async getActiveApplicationId(@Param('entityId') entityId: string) {
    return await this.buyerQuickApplicationService.getActiveApplicationId(
      entityId,
    );
  }

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

  @Post('/:id/submit')
  async submitApplication(@Param('id') applicationId: string) {
    const application = await this.buyerQuickApplicationService.markAsComplete(
      applicationId,
    );
    return application;
  }

  @Post('/:id/buyer-info')
  async createBuyerInfo(
    @Param('id') applicationId: string,
    @Body() buyerInfo: CreateBuyerRequest,
  ) {
    const buyerInformation =
      await this.buyerQuickApplicationBuyerInformationService.createBuyerInformation(
        buyerInfo,
        applicationId,
      );
    return buyerInformation;
  }

  @Patch('/:id/buyer-info')
  async updateBuyerInfo(
    @Param('id') applicationId: string,
    @Body() buyerInfo: UpdateBuyerRequest,
  ) {
    const buyerInformation =
      await this.buyerQuickApplicationBuyerInformationService.updateBuyerInformation(
        buyerInfo,
        applicationId,
      );
    return buyerInformation;
  }

  @Post('/:id/supplier-info')
  async createSupplierInfo(
    @Param('id') applicationId: string,
    @Body() supplierInfo: CreateSupplierInformationRequest,
  ) {
    const supplierInformation =
      await this.buyerQuickApplicationASupplierInformationService.createSupplierInformation(
        supplierInfo,
        applicationId,
      );
    return supplierInformation;
  }

  @Post('/:id/order-details')
  async createOrder(
    @Param('id') applicationId: string,
    @Body() orderDetailDto: CreateOrderDetailDto,
  ) {
    const orderDetail =
      await this.buyerQuickApplicationOrderDetailsService.createOrderDetail(
        orderDetailDto,
        applicationId,
      );
    return orderDetail;
  }

  @Post('/:id/security')
  async createCollateral(
    @Param('id') applicationId: string,
    @Body() securityInfo: CreateCollateralDto,
  ) {
    const collateral =
      await this.buyerQuickApplicationCollateralService.createCollateral(
        securityInfo,
        applicationId,
      );
    return collateral;
  }

  @Patch('/:id/security')
  async updateCollateral(
    @Param('id') applicationId: string,
    @Body() securityInfo: UpdateCollateralDto,
  ) {
    const collateral =
      await this.buyerQuickApplicationCollateralService.updateCollateral(
        securityInfo,
        applicationId,
      );
    return collateral;
  }

  @Post('/:id/payment-terms')
  async createPaymentTerm(
    @Param('id') applicationId: string,
    @Body() paymentTermInfo: CreatePaymentTermDto,
  ) {
    const paymentTerm =
      await this.buyerQuickApplicationpaymentTermService.createPaymentTerm(
        paymentTermInfo,
        applicationId,
      );
    return paymentTerm;
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
