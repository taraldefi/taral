import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCollateralDto } from 'src/modules/collateral/dto/request/create-collateral.dto';
import { CollateralEntity } from 'src/modules/collateral/models/collaterals.entity';
import { CollateralService } from 'src/modules/collateral/services/collateral.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { UpdateCollateralDto } from 'src/modules/collateral/dto/request/update-collateral.dto';
import { GetCollateralResponse } from 'src/modules/collateral/dto/response/get-collateral-response.dto';
import { CollateralMappingService } from 'src/modules/collateral/services/mapping.service';

@Injectable()
export class BuyerQuickApplicationCollateralService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly collateralService: CollateralService,
    private readonly mappingService: CollateralMappingService,
  ) {}

  public async getCollateral(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['security'],
      },
    );
    return await this.collateralService.get(application.security.id);
  }

  public async createCollateral(
    data: CreateCollateralDto,
    applicationId: string,
  ): Promise<GetCollateralResponse> {
    const savedCollateral = await this.collateralService.create(data);
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
    application.security = savedCollateral;
    application.save();

    return this.mappingService.mapCollateralDetails(savedCollateral);
  }

  public async updateCollateral(
    data: UpdateCollateralDto,
    applicationId: string,
  ): Promise<GetCollateralResponse> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['security'],
      },
    );
    const savedCollateral = await this.collateralService.update(
      application.security.id,
      data,
    );

    return savedCollateral;
  }
}
