import { Injectable } from '@nestjs/common';
import { GetCollateralResponse } from '../dto/response/get-collateral-response.dto';
import { CollateralEntity } from '../models/collaterals.entity';

@Injectable()
export class CollateralMappingService {
  public mapCollateralDetails(
    collateral: CollateralEntity,
  ): GetCollateralResponse {
    var response = new GetCollateralResponse();

    response.id = collateral.id;
    response.facilityType = collateral.facilityType;
    response.financingRatio = collateral.financingRatio;
    response.facilityAmount = collateral.facilityAmount;
    response.requestedTenure = collateral.requestedTenure;
    response.requestedPurpose = collateral.requestedPurpose;
    response.repaymentSource = collateral.repaymentSource;
    response.collateralProviderExperience =
      collateral.collateralProviderExperience;
    response.collateralProviderInfluence =
      collateral.collateralProviderInfluence;

    return response;
  }
}
