import { Injectable } from '@nestjs/common';
import { CreateCollateralDto } from '../dto/request/create-collateral.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollateralEntity } from '../models/collaterals.entity';
import { CollateralsRepository } from '../repositories/collaterals.repository';
import { GetCollateralResponse } from '../dto/response/get-collateral-response.dto';
import { CollateralMappingService } from './mapping.service';
import { UpdateCollateralDto } from '../dto/request/update-collateral.dto';

@Injectable()
export class CollateralService {
  constructor(
    @InjectRepository(CollateralEntity)
    private collateralRepository: CollateralsRepository,
    private readonly collateralMappingService: CollateralMappingService,
  ) {}

  async createCollateral(
    data: CreateCollateralDto,
  ): Promise<GetCollateralResponse> {
    const collateral = new CollateralEntity();

    collateral.facilityType = data.facilityType;
    collateral.financingRatio = data.financingRatio;
    collateral.facilityAmount = data.facilityAmount;
    collateral.requestedTenure = data.requestedTenure;
    collateral.requestedPurpose = data.requestedPurpose;
    collateral.repaymentSource = data.repaymentSource;
    collateral.collateralProviderExperience = data.collateralProviderExperience;
    collateral.collateralProviderInfluence = data.collateralProviderInfluence;

    const savedCollateral = await this.collateralRepository.save(collateral);
    return this.collateralMappingService.mapCollateralDetails(savedCollateral);
  }

  public async getCollateral(id: string): Promise<GetCollateralResponse> {
    const collateral = await this.collateralRepository.findOne({
      where: { id: id },
    });
    return this.collateralMappingService.mapCollateralDetails(collateral);
  }

  public async updateCollateral(id: string, data: UpdateCollateralDto) {
    const collateral = await this.collateralRepository.findOneOrFail({
      where: { id: id },
    });
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
    }
    if (data.collateralProviderInfluence) {
      collateral.collateralProviderInfluence = data.collateralProviderInfluence;
    }
    const updatedCollateral = await this.collateralRepository.save(collateral);
    return this.collateralMappingService.mapCollateralDetails(
      updatedCollateral,
    );
  }

  public async deleteCollateral(id: string) {
    const collateral = await this.collateralRepository.findOneOrFail({
      where: { id: id },
    });
    await this.collateralRepository.delete({ id: id });
  }

  public async getAllCollaterals(): Promise<GetCollateralResponse[]> {
    const collaterals = await this.collateralRepository.find();
    return collaterals.map((collateral) => {
      return this.collateralMappingService.mapCollateralDetails(collateral);
    });
  }
}
