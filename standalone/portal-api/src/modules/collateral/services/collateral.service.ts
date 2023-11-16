import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { triggerError } from 'src/common/trigger.error';
import { CreateCollateralDto } from '../dto/request/create-collateral.dto';
import { UpdateCollateralDto } from '../dto/request/update-collateral.dto';
import { GetCollateralResponse } from '../dto/response/get-collateral-response.dto';
import { CollateralEntity } from '../models/collaterals.entity';
import { CollateralsRepository } from '../repositories/collaterals.repository';
import { CollateralMappingService } from './mapping.service';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class CollateralService extends BaseService {
  constructor(
    @InjectRepository(CollateralEntity)
    private collateralRepository: CollateralsRepository,
    private readonly collateralMappingService: CollateralMappingService,
    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {
    super();
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async create(
    data: CreateCollateralDto,
    applicationId: string,
  ): Promise<GetCollateralResponse> {
    this.setupTransactionHooks();
    const collateral = new CollateralEntity();

    collateral.facilityType = data.facilityType;
    collateral.financingRatio = data.financingRatio;
    collateral.facilityAmount = data.facilityAmount;
    collateral.requestedTenure = data.requestedTenure;
    collateral.requestedPurpose = data.requestedPurpose;
    collateral.repaymentSource = data.repaymentSource;
    collateral.collateralProviderExperience =
      data.collateralProviderExperience ?? null;
    collateral.collateralProviderInfluence =
      data.collateralProviderInfluence ?? null;

    const savedCollateral = await this.collateralRepository.save(collateral);

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

    return this.collateralMappingService.mapCollateralDetails(savedCollateral);
  }

  public async get(applicationId: string): Promise<GetCollateralResponse> {
    if (!applicationId) throw triggerError('missing-entity-id');

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['security'],
      },
    );

    const collateral = await this.collateralRepository.findOne({
      where: { id: application.security.id },
    });

    if (!collateral) throw triggerError('entity-not-found');

    return this.collateralMappingService.mapCollateralDetails(collateral);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async update(
    data: UpdateCollateralDto,
    applicationId: string,
  ): Promise<GetCollateralResponse> {
    this.setupTransactionHooks();
    if (!applicationId) throw triggerError('missing-entity-id');

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['security'],
      },
    );

    const collateral = await this.collateralRepository.findOne({
      where: { id: application.security.id },
    });

    if (!collateral) throw triggerError('entity-not-found');

    if (data.facilityType) {
      collateral.facilityType = data.facilityType;
    }
    if (data.financingRatio) {
      collateral.financingRatio = data.financingRatio;
    }
    if (data.facilityAmount) {
      collateral.facilityAmount = data.facilityAmount;
    }
    if (data.requestedTenure) {
      collateral.requestedTenure = data.requestedTenure;
    }
    if (data.requestedPurpose) {
      collateral.requestedPurpose = data.requestedPurpose;
    }
    if (data.repaymentSource) {
      collateral.repaymentSource = data.repaymentSource;
    }
    if (data.collateralProviderExperience) {
      collateral.collateralProviderExperience =
        data.collateralProviderExperience;
    } else {
      collateral.collateralProviderExperience = null;
    }
    if (data.collateralProviderInfluence) {
      collateral.collateralProviderInfluence = data.collateralProviderInfluence;
    } else {
      collateral.collateralProviderInfluence = null;
    }

    const updatedCollateral = await this.collateralRepository.save(collateral);

    return this.collateralMappingService.mapCollateralDetails(
      updatedCollateral,
    );
  }

  public async delete(id: string) {
    if (!id) throw triggerError('missing-entity-id');

    const collateral = await this.collateralRepository.findOne({
      where: { id: id },
    });

    if (!collateral) throw triggerError('entity-not-found');

    await this.collateralRepository.delete({ id: id });
  }

  public async getAll(): Promise<GetCollateralResponse[]> {
    const collaterals = await this.collateralRepository.find();

    return collaterals.map((collateral) => {
      return this.collateralMappingService.mapCollateralDetails(collateral);
    });
  }
}
