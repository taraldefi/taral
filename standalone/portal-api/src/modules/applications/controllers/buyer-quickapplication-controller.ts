import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateCollateralDto } from 'src/modules/collateral/dto/request/create-collateral.dto';
import { BuyerCompanyEntityService } from 'src/modules/company/services/buyer-entity.service';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { CreateQuickApplicationRequest } from '../dto/request/create-quick-application.dto';

import { CreatePaymentTermDto } from 'src/modules/payment-term/dto/request/create-payment-term.dto';

import { BuyerQuickApplicationService } from '../services/buyer-quick-application.service/application.service';
import { UpdateCollateralDto } from 'src/modules/collateral/dto/request/update-collateral.dto';

import { UpdatePaymentTermDto } from 'src/modules/payment-term/dto/request/update-payment-term.dto';
import { CreateOrderProductDto } from 'src/modules/order-detail/dto/request/create-order-product.dto';
import { UpdateOrderDetailDto } from 'src/modules/order-detail/dto/request/update-order-detail.dto';
import { UpdateOrderProductDto } from 'src/modules/order-detail/dto/request/update-order-product.dto';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { EntityNotFoundError } from 'typeorm';
import { CollateralService } from 'src/modules/collateral/services/collateral.service';
import { PaymentTermService } from 'src/modules/payment-term/services/payment-term.service';
import { OrderDetailService } from 'src/modules/order-detail/services/order-detail.service';
import { OrderProductService } from 'src/modules/order-detail/services/order-product.service';

import { BuyerInformationService } from 'src/modules/company-information/services/buyer-information.service';
import { CreateBuyerCompanyRequest } from 'src/modules/company-information/dto/request/buyer/create-buyer-company.dto';
import { UpdateBuyerCompanyRequest } from 'src/modules/company-information/dto/request/buyer/update-buyer-company.dto';
import { SupplierInformationService } from 'src/modules/company-information/services/supplier-information.service';
import { CreateSupplierInformationRequest } from 'src/modules/company-information/dto/request/supplier/create-supplier-company.dto';
import { UpdateSupplierInformationRequest } from 'src/modules/company-information/dto/request/supplier/update-supplier-company.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@ApiTags('Applications')
@Controller({
  path: 'quick-applications',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class QuickApplicationController {
  constructor(
    private readonly buyerQuickApplicationService: BuyerQuickApplicationService,
    private readonly entityService: BuyerCompanyEntityService,
    private readonly collateralService: CollateralService,
    private readonly buyerInformationService: BuyerInformationService,
    private readonly supplierInformationService: SupplierInformationService,
    private readonly orderDetailService: OrderDetailService,
    private readonly orderProductService: OrderProductService,
    private readonly paymentTermService: PaymentTermService,
  ) {}

  // Routes for operations related to applications

  @Get('/all-applications/:id')
  async getAllApplications(@Param('id') entityId: string) {
    return await this.buyerQuickApplicationService.getAllApplications(entityId);
  }
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
    let entity: BuyerCompanyEntity = undefined;

    try {
      entity = await this.entityService.findBuyerEntityById(
        applicationDto.entityId,
      );
    } catch (exception) {
      throw new EntityNotFoundError('LegalBuyerEntity', {
        where: {
          id: applicationDto.entityId,
        },
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

  // Submit on chain transaction ID
  @Post('/:id/:txId/submit-transaction')
  async submitTransactionId(
    @Param('id') applicationId: string,
    @Param('txId') transactionId: string,
  ) {
    const application =
      await this.buyerQuickApplicationService.insertPurchaseOrderTxId(
        applicationId,
        transactionId,
      );
    return application;
  }

  // Routes for operations related to application's buyer information

  @Get('/:id/buyer-info')
  async getBuyerInfo(@Param('id') id: string) {
    return await this.buyerInformationService.get(id);
  }

  // Create buyer information for an application
  @Post('/:id/buyer-info')
  async createBuyerInfo(
    @Param('id') applicationId: string,
    @Body() buyerInfo: CreateBuyerCompanyRequest,
  ) {
    const buyerInformation = await this.buyerInformationService.create(
      buyerInfo,
      applicationId,
    );
    return buyerInformation;
  }

  //Update buyer information for an application
  @Patch('/:id/buyer-info')
  async updateBuyerInfo(
    @Param('id') applicationId: string,
    @Body() buyerInfo: UpdateBuyerCompanyRequest,
  ) {
    const buyerInformation = await this.buyerInformationService.update(
      buyerInfo,
      applicationId,
    );
    return buyerInformation;
  }

  // Routes for operations related to application's supplier information

  //Get supplier info of an application by ID
  @Get('/:id/supplier-info')
  async getSupplierInfo(@Param('id') id: string) {
    return await this.supplierInformationService.getSupplierInformation(id);
  }

  // Create supplier information for an application
  @Post('/:id/supplier-info')
  async createSupplierInfo(
    @Param('id') applicationId: string,
    @Body() supplierInfo: CreateSupplierInformationRequest,
  ) {
    const supplierInformation =
      await this.supplierInformationService.createSupplierInformation(
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
      await this.supplierInformationService.updateSupplierInformation(
        applicationId,
        supplierInfo,
      );
    return supplierInformation;
  }

  // Routes for operations related to application's order details

  // Get order details of an application by ID
  @Get('/:id/order-details')
  async getOrderDetails(@Param('id') id: string) {
    return await this.orderDetailService.get(id);
  }
  // Create order details for an application
  @Post('/:id/order-details')
  async createOrder(
    @Param('id') applicationId: string,
    @Body() orderDetailDto: CreateOrderDetailDto,
  ) {
    const orderDetail = await this.orderDetailService.create(
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
    const orderDetail = await this.orderDetailService.update(
      applicationId,
      orderDetailDto,
    );
    return orderDetail;
  }

  // Add Product to an Order Detail
  @Post('/:id/order-products')
  async createOrderProduct(
    @Param('id') applicationId: string,
    @Body() orderProductDto: CreateOrderProductDto,
  ) {
    const orderProduct = await this.orderProductService.create(
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
    const orderProduct = await this.orderProductService.update(
      productId,
      orderProductDto,
    );
    return orderProduct;
  }

  // Delete Product to an Order Detail
  @Delete('/:id/:productId/order-products')
  async deleteOrderProduct(
    @Param('id') applicationId: string,
    @Param('productId') productId: string,
  ) {
    const orderProduct = await this.orderProductService.delete(productId);
    return orderProduct;
  }

  // Routes for operations related to application's collateral

  // Get collateral of an application by ID
  @Get('/:id/security')
  async getSecurity(@Param('id') id: string) {
    return await this.collateralService.get(id);
  }

  // Create collateral for an application
  @Post('/:id/security')
  async createCollateral(
    @Param('id') applicationId: string,
    @Body() securityInfo: CreateCollateralDto,
  ) {
    const collateral = await this.collateralService.create(
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
    const collateral = await this.collateralService.update(
      securityInfo,
      applicationId,
    );
    return collateral;
  }

  // Routes for operations related to application's payment terms

  // Get payment terms of an application by ID
  @Get('/:id/payment-terms')
  async getPaymentTerm(@Param('id') id: string) {
    return await this.paymentTermService.get(id);
  }

  // Create payment terms for an application
  @Post('/:id/payment-terms')
  async createPaymentTerm(
    @Param('id') applicationId: string,
    @Body() paymentTermInfo: CreatePaymentTermDto,
  ) {
    const paymentTerm = await this.paymentTermService.create(
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
    const paymentTerm = await this.paymentTermService.update(
      applicationId,
      paymentTermInfo,
    );
    return paymentTerm;
  }
}
