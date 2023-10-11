import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBuyerRequest } from 'src/modules/buyer/dto/request/create-buyer.dto';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';
import { BuyerService } from 'src/modules/buyer/services/buyer.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { GetBuyerResponse } from 'src/modules/buyer/dto/response/get-buyer-response.dto';
import { UpdateBuyerRequest } from 'src/modules/buyer/dto/request/update-buyer.dto';

@Injectable()
export class BuyerQuickApplicationBuyerInformationService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly buyerService: BuyerService,
  ) {}

  public async createBuyerInformation(
    data: CreateBuyerRequest,
    applicationId: string,
  ): Promise<BuyerEntity> {
    //TODO: check if application ID is valid to prevent isolated buyer entity creation
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
    const savedBuyer = await this.buyerService.createEntity(data);

    application.buyerInformation = savedBuyer;
    application.save();

    return savedBuyer;
  }

  public async updateBuyerInformation(
    data: UpdateBuyerRequest,
    applicationId: string,
  ): Promise<GetBuyerResponse> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['buyerInformation'],
      },
    );
    const savedBuyer = await this.buyerService.updateEntity(
      application.buyerInformation.id,
      data,
    );

    return savedBuyer;
  }
}
