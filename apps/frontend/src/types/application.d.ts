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
  companyName: "Engelbrecht Ltd";
  dateEstablished: "2022-12-12";
  phoneNumber: "1234567891";
  registrationNumbers: "123456";
  taxAndRevenue: TaxAndRevenue;
  address: Address;
}

interface TaxAndRevenue {
  lastFiscalYear: "2022-12-12";
  totalRevenue: "100000";
  exportRevenuePercentage: "10";
}

interface Address {
  city: "Cluj-Napoca";
  addressLine1: "First Address Line one";
  addressLine2: "Second Address Line two";
  postalCode: "ABC123";
}
interface CreateBuyerInformationForBuyerApplication {
  company: Company;
}
interface CreateBuyerInformationForBuyerApplicationResponse {
  id: string;
  company: Company;
}
export {
  CreateApplication,
  CreateApplicationResponse,
  CreateBuyerInformationForBuyerApplication,
  Address,
  Company,
  TaxAndRevenue,
};
