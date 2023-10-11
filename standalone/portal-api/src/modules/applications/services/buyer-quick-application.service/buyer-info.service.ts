import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBuyerRequest } from 'src/modules/buyer/dto/request/create-buyer.dto';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';
import { BuyerService } from 'src/modules/buyer/services/buyer.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { GetBuyerResponse } from 'src/modules/buyer/dto/response/get-buyer-response.dto';
import { UpdateBuyerRequest } from 'src/modules/buyer/dto/request/update-buyer.dto';
import { EntityMappingService } from 'src/modules/buyer/services/mapping.service';

@Injectable()
export class BuyerQuickApplicationBuyerInformationService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly buyerService: BuyerService,
    private readonly buyerMappingService: EntityMappingService,
  ) {}

  public async getBuyerInformation(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['buyerInformation'],
      },
    );

    const buyer = await this.buyerService.getEntity(
      application.buyerInformation.id,
    );

    return this.buyerMappingService.mapEntityDetails(buyer);
  }

  public async createBuyerInformation(
    data: CreateBuyerRequest,
    applicationId: string,
  ): Promise<GetBuyerResponse> {
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
    // TODO: check if buyer already exists
    const savedBuyer = await this.buyerService.createEntity(data);

    application.buyerInformation = savedBuyer;
    await application.save();

    return this.buyerMappingService.mapEntityDetails(savedBuyer);
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

    return this.buyerMappingService.mapEntityDetails(savedBuyer);
  }
}
