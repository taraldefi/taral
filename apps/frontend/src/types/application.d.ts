interface CreateApplication {
  title: string;
  entityId: string;
}

interface CreateApplicationResponse {
  title: string;
  issuanceDate: string;
  status: string;
  createdAt: string;
  id: string;
}
interface Company {
  companyName: string;
  dateEstablished: string;
  phoneNumber: string;
  registrationNumbers: string;
  taxAndRevenue: TaxAndRevenue;
  address: Address;
}

interface TaxAndRevenue {
  lastFiscalYear: string;
  totalRevenue: string;
  exportRevenuePercentage: string;
}

interface Address {
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
}

interface CreateBuyerInformationForBuyerApplication {
  address: Address;
  taxAndRevenue: TaxAndRevenue;
  phoneNumber: string;
  registrationNumbers: string;
}

interface GetBuyerInfoResponse {
  address: Address;
  taxAndRevenue: TaxAndRevenue;
  id: string;
  companyName: string;
  dateEstablished: string;
  employeeCount: number | null;
  phoneNumber: string;
  registrationNumbers: string;
}

interface SupplierEntityResponse {
  id: string;
  logo: string;
  name: string;
  beneficialOwner: string;
  abbreviation: string;
  nationality: string;
  headquarters: string;
  industryType: string;
  coreBusiness: string;
  incorporationDate: string;
  legalForm: string;
  phoneNumber: string;
  employeeCount: number | null;
  registrationNumbers: string;
  address: Address;
  taxAndRevenue: TaxAndRevenue;
}

export {
  CreateApplication,
  CreateApplicationResponse,
  CreateBuyerInformationForBuyerApplication,
  SupplierEntityResponse,
  GetBuyerInfoResponse,
  Address,
  Company,
  TaxAndRevenue,
};
