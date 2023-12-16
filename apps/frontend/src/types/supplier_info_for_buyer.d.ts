export interface CreateSupplierInformationForBuyerApplication {
  supplierId: string;
  relationshipWithSupplier: RelationshipWithSupplier;
}

export interface GetSupplierInfoResponse {
  supplierId: string;
  relationshipExists: boolean;
  relationshipWithSupplier: RelationshpWithSupplierResponse;
}
type RelationshpWithSupplierResponse = RelationshipWithSupplier & {
  id: string;
};

export interface RelationshipWithSupplier {
  shareHoldingRelationship: string | null;
  influence: string | null;
  paymentExperience: PaymentExperience;
}

export interface PaymentExperience {
  exists: boolean;
  description: string | null;
  length: string | null;
  noOfDeals: number | null;
  avgBusinessVol: string | null;
  history: string | null;
  delays: string | null;
}

export interface SupplierInformation {
  company: Company;
}

export interface Company {
  companyName?: string;
  dateEstablished: string;
  phoneNumber: string;
  registrationNumber: string;
  address: Address;
}

export interface Address {
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
}
