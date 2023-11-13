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
  company: Company;
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

export {
  CreateApplication,
  CreateApplicationResponse,
  CreateBuyerInformationForBuyerApplication,
  GetBuyerInfoResponse,
  Address,
  Company,
  TaxAndRevenue,
};
