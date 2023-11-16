import { Injectable } from '@nestjs/common';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { GetBuyerResponse } from 'src/modules/applications/dto/response/buyer-information/get-buyer-response.dto';
import { GetBuyerCompanyAddressRequest } from 'src/modules/applications/dto/response/buyer-information/get-buyer-company-address-response.dto';
import { GetBuyerCompanyTaxAndRevenueRequest } from 'src/modules/applications/dto/response/buyer-information/get-buyer-company-tax-and-revenue.response.dto';

@Injectable()
export class EntityMappingService {
  public mapManyEntities(entities: BuyerCompanyEntity[]): GetBuyerResponse[] {
    var response = new Array<GetBuyerResponse>();

    entities.forEach((entity) => {
      response.push(this.mapEntityDetails(entity));
    });

    return response;
  }

  public mapEntityDetails(entity: BuyerCompanyEntity): GetBuyerResponse {
    var response = new GetBuyerResponse();
    response.address = new GetBuyerCompanyAddressRequest();
    response.taxAndRevenue = new GetBuyerCompanyTaxAndRevenueRequest();

    response.id = entity.id;
    response.companyName = entity.name;
    response.dateEstablished = entity.incorporationDate;
    if (entity.companyInformation) {
      response.employeeCount = entity.companyInformation.employeeCount;
      response.phoneNumber = entity.companyInformation.phoneNumber;
      response.registrationNumbers =
        entity.companyInformation.registrationNumbers;

      response.address.addressLine1 =
        entity.companyInformation.address.addressLine1;
      response.address.addressLine2 =
        entity.companyInformation.address.addressLine2;
      response.address.city = entity.companyInformation.address.city;
      response.address.postalCode =
        entity.companyInformation.address.postalCode;

      if (entity.companyInformation.taxAndRevenue.taxNumber) {
        response.taxAndRevenue.taxNumber =
          entity.companyInformation.taxAndRevenue.taxNumber;
      }
      if (entity.companyInformation.taxAndRevenue.audited) {
        response.taxAndRevenue.audited =
          entity.companyInformation.taxAndRevenue.audited;
      }
      if (entity.companyInformation.taxAndRevenue.exportRevenuePercentage) {
        response.taxAndRevenue.exportRevenuePercentage =
          entity.companyInformation.taxAndRevenue.exportRevenuePercentage;
      }
      if (entity.companyInformation.taxAndRevenue.exportValue) {
        response.taxAndRevenue.exportValue =
          entity.companyInformation.taxAndRevenue.exportValue;
      }
      if (entity.companyInformation.taxAndRevenue.lastFiscalYear) {
        response.taxAndRevenue.lastFiscalYear =
          entity.companyInformation.taxAndRevenue.lastFiscalYear;
      }
      if (entity.companyInformation.taxAndRevenue.totalRevenue) {
        response.taxAndRevenue.totalRevenue =
          entity.companyInformation.taxAndRevenue.totalRevenue;
      }
    }

    return response;
  }
}
