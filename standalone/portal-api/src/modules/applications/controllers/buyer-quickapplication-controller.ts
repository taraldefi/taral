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
import { UpdateSupplierInformationRequest } from '../dto/request/update-supplier-info.dto';
import { UpdatePaymentTermDto } from 'src/modules/payment-term/dto/request/update-payment-term.dto';
import { CreateOrderProductDto } from 'src/modules/order-detail/dto/request/create-order-product.dto';
import { UpdateOrderDetailDto } from 'src/modules/order-detail/dto/request/update-order-detail.dto';
import { UpdateOrderProductDto } from 'src/modules/order-detail/dto/request/update-order-product.dto';
import { LegalBuyerEntity } from 'src/modules/entity/models/legal-buyer-entity.entity';
import { EntityNotFoundError } from 'typeorm';

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
    private readonly buyerQuickApplicationSupplierInformationService: BuyerQuickApplicationSupplierInformationService,
    private readonly buyerQuickApplicationOrderDetailsService: BuyerQuickApplicationOrderDetailService,
    private readonly buyerQuickApplicationCollateralService: BuyerQuickApplicationCollateralService,
    private readonly buyerQuickApplicationpaymentTermService: BuyerQuickApplicationPaymentTermService,
  ) {}

  // Routes for operations related to applications

  // Get application by ID
  @Get('/:id')
  async getApplication(@Param('id') id: string) {
    return await this.buyerQuickApplicationService.get(id);
  }

  // Get active application by Entity ID
  @Get('/:entityId/active')
  async getActiveApplicationId(@Param('entityId') entityId: string) {
    return await this.buyerQuickApplicationService.getActiveApplicationId(
      entityId,
    );
  }

  // Create an application
  @Post()
  async create(@Body() applicationDto: CreateQuickApplicationRequest) {
  
    let entity: LegalBuyerEntity = undefined;

    try {
      entity = await this.entityService.findBuyerEntityById(
        applicationDto.entityId,
      );
    } catch (exception) {
      throw new EntityNotFoundError('LegalBuyerEntity', {
        where: {
          id: applicationDto.entityId
        }
      });
    }


    const application = await this.buyerQuickApplicationService.create(
      applicationDto,
      entity,
    );
    return application;
  }

  // Submit a valid application
  @Post('/:id/submit')
  async submitApplication(@Param('id') applicationId: string) {
    const application = await this.buyerQuickApplicationService.markAsComplete(
      applicationId,
    );
    return application;
  }

  // Routes for operations related to application's buyer information

  @Get('/:id/buyer-info')
  async getBuyerInfo(@Param('id') id: string) {
    return await this.buyerQuickApplicationBuyerInformationService.getBuyerInformation(
      id,
    );
  }

  // Create buyer information for an application
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

  // Update buyer information for an application
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

  // Routes for operations related to application's supplier information

  // Get supplier info of an application by ID
  @Get('/:id/supplier-info')
  async getSupplierInfo(@Param('id') id: string) {
    return await this.buyerQuickApplicationSupplierInformationService.getSupplierInformation(
      id,
    );
  }

  // Create supplier information for an application
  @Post('/:id/supplier-info')
  async createSupplierInfo(
    @Param('id') applicationId: string,
    @Body() supplierInfo: CreateSupplierInformationRequest,
  ) {
    const supplierInformation =
      await this.buyerQuickApplicationSupplierInformationService.createSupplierInformation(
        supplierInfo,
        applicationId,
      );
    return supplierInformation;
  }

  // Update supplier information for an application
  @Patch('/:id/supplier-info')
  async updateSupplierInfo(
    @Param('id') applicationId: string,
    @Body() supplierInfo: UpdateSupplierInformationRequest,
  ) {
    const supplierInformation =
      await this.buyerQuickApplicationSupplierInformationService.updateSupplierInformation(
        applicationId,
        supplierInfo,
      );
    return supplierInformation;
  }

  // Routes for operations related to application's order details

  // Get order details of an application by ID
  @Get('/:id/order-details')
  async getOrderDetails(@Param('id') id: string) {
    return await this.buyerQuickApplicationOrderDetailsService.getOrderDetails(
      id,
    );
  }
  // Create order details for an application
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

  // Update order details for an application
  @Patch('/:id/order-details')
  async updateOrder(
    @Param('id') applicationId: string,
    @Body() orderDetailDto: UpdateOrderDetailDto,
  ) {
    const orderDetail =
      await this.buyerQuickApplicationOrderDetailsService.updateOrderDetail(
        orderDetailDto,
        applicationId,
      );
    return orderDetail;
  }

  // Add Product to an Order Detail
  @Post('/:id/order-products')
  async createOrderProduct(
    @Param('id') applicationId: string,
    @Body() orderProductDto: CreateOrderProductDto,
  ) {
    const orderProduct =
      await this.buyerQuickApplicationOrderDetailsService.addProductsToOrderDetail(
        orderProductDto,
        applicationId,
      );
    return orderProduct;
  }

  // Update Product to an Order Detail
  @Patch('/:id/:productId/order-products')
  async updateOrderProduct(
    @Param('id') applicationId: string,
    @Param('productId') productId: string,
    @Body() orderProductDto: UpdateOrderProductDto,
  ) {
    const orderProduct =
      await this.buyerQuickApplicationOrderDetailsService.updateProductsToOrderDetail(
        orderProductDto,
        applicationId,
        productId,
      );
    return orderProduct;
  }

  // Delete Product to an Order Detail
  @Delete('/:id/:productId/order-products')
  async deleteOrderProduct(
    @Param('id') applicationId: string,
    @Param('productId') productId: string,
  ) {
    const orderProduct =
      await this.buyerQuickApplicationOrderDetailsService.deleteProductsToOrderDetail(
        applicationId,
        productId,
      );
    return orderProduct;
  }

  // Routes for operations related to application's collateral

  // Get collateral of an application by ID
  @Get('/:id/security')
  async getSecurity(@Param('id') id: string) {
    return await this.buyerQuickApplicationCollateralService.getCollateral(id);
  }

  // Create collateral for an application
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

  // Update collateral for an application
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

  // Routes for operations related to application's payment terms

  // Get payment terms of an application by ID
  @Get('/:id/payment-terms')
  async getPaymentTerm(@Param('id') id: string) {
    return await this.buyerQuickApplicationpaymentTermService.getPaymentTerm(
      id,
    );
  }

  // Create payment terms for an application
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

  @Patch('/:id/payment-terms')
  async updatePaymentTerm(
    @Param('id') applicationId: string,
    @Body() paymentTermInfo: UpdatePaymentTermDto,
  ) {
    const paymentTerm =
      await this.buyerQuickApplicationpaymentTermService.updatePaymentTerm(
        paymentTermInfo,
        applicationId,
      );
    return paymentTerm;
  }
}
