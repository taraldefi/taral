import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCollateralDto } from 'src/modules/collateral/dto/request/create-collateral.dto';
import { CollateralService } from 'src/modules/collateral/services/collateral.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { UpdateCollateralDto } from 'src/modules/collateral/dto/request/update-collateral.dto';
import { GetCollateralResponse } from 'src/modules/collateral/dto/response/get-collateral-response.dto';
import { CollateralMappingService } from 'src/modules/collateral/services/mapping.service';
import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';

@Injectable()
export class BuyerQuickApplicationCollateralService extends BaseService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly collateralService: CollateralService,
    private readonly mappingService: CollateralMappingService,
  ) {
    super();
  }

  public async getCollateral(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['security'],
      },
    );
    return await this.collateralService.get(application.security.id);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createCollateral(
    data: CreateCollateralDto,
    applicationId: string,
  ): Promise<GetCollateralResponse> {
    this.setupTransactionHooks();

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

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updateCollateral(
    data: UpdateCollateralDto,
    applicationId: string,
  ): Promise<GetCollateralResponse> {
    this.setupTransactionHooks();

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
