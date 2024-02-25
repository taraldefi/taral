interface CreateApplication {
  title: string;
  entityId: string;
  onChainPrincipal: string;
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
  registrationNumber: string;
  taxAndRevenue: TaxAndRevenue;
  address: Address;
}

interface TaxAndRevenue {
  lastFiscalYear: number;
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
  email: string;
  address: Address;
}

interface GetBuyerInfoResponse {
  address: Address;
  taxAndRevenue: TaxAndRevenue;
  id: string;
  companyName: string;
  dateEstablished: string;
  employeeCount: number | null;
  email: string;
  phoneNumber: string;
  registrationNumber: string;
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
  registrationNumber: string;
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
