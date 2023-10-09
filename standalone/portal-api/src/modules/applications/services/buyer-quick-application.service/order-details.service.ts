import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDetailDto } from 'src/modules/order-detail/dto/request/create-order-detail.dto';
import { GetOrderDetailsResponse } from 'src/modules/order-detail/dto/response/get-order-detail-response.dto';
import { OrderDetailService } from 'src/modules/order-detail/services/order-detail.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';

@Injectable()
export class BuyerQuickApplicationOrderDetailService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly orderDetailsService: OrderDetailService,
  ) {}

  public async createOrderDetail(
    data: CreateOrderDetailDto,
    applicationId: string,
  ): Promise<GetOrderDetailsResponse> {
    const savedOrder = await this.orderDetailsService.create(data);
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: [
          'buyerInformation',
          'supplierInformation',
          'paymentTerms',
          'orderDetails',
          'security',
          'transactionDocuments',
        ],
      },
    );
    application.orderDetails = savedOrder;
    application.save();

    return savedOrder;
  }
}
