import { Injectable } from '@nestjs/common';
import { CreateCollateralDto } from '../dto/request/create-collateral.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollateralEntity } from '../models/collaterals.entity';
import { CollateralsRepository } from '../repositories/collaterals.repository';
import { GetCollateralDto } from '../dto/response/get-collateral.dto';

@Injectable()
export class CollateralService {
  constructor(
    @InjectRepository(CollateralEntity)
    private collateralRepository: CollateralsRepository,
  ) {}

  async createCollateral(data: CreateCollateralDto): Promise<GetCollateralDto> {
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
    return savedCollateral;
  }

  public async getCollateral(id: string): Promise<GetCollateralDto> {
    const collateral = await this.collateralRepository.findOne({
      where: { id: id },
    });
    return collateral;
  }

  public async getAllCollaterals(): Promise<GetCollateralDto[]> {
    return await this.collateralRepository.find();
  }
}
