export enum FacilityType {
  IMPORTER_FINANCING = "IMPORTER_FINANCING",
  EXPORTER_FINANCING = "EXPORTER_FINANCING",
}
export interface CreateCollateralInformation {
  facilityType: FacilityType;
  financingRatio: string;
  facilityAmount: string;
  requestedTenure: string;
  requestedPurpose: string;
  repaymentSource: string;
  collateralProviderExperience: string | null;
  collateralProviderInfluence: string | null;
}

export interface GetCollateralResponse {
  id: string;
  facilityType: FacilityType;
  financingRatio: string;
  facilityAmount: string;
  requestedTenure: string;
  requestedPurpose: string;
  repaymentSource: string;
  collateralProviderExperience: string | null;
  collateralProviderInfluence: string | null;
}
