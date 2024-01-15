import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsString, ValidateNested } from 'class-validator';

import { GetOrderDetailsResponse } from 'src/modules/order-detail/dto/response/get-order-detail-response.dto';
import { GetPaymentTermResponse } from 'src/modules/payment-term/dto/response/get-payment-term.response.dto';
import { GetCollateralResponse } from 'src/modules/collateral/dto/response/get-collateral-response.dto';
import { CreateTxDocResponse } from 'src/modules/transaction-documents/dto/response/create-transaction-document-response.dto';
import { GetBuyerResponse } from 'src/modules/company-information/dto/response/buyer/get-buyer-response.dto';

export class GetBuyerQuickApplicationResponse {
  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  applicationNumber: string;

  @ApiProperty({ example: '12-12-2022' })
  @IsDateString()
  issuanceDate: Date;

  @ApiProperty({ example: '12-12-2022' })
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: 'ACTIVE' })
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  exporterName: string;

  @ApiProperty()
  @IsString()
  sellerPrincipal: string;

  @ApiProperty()
  @IsString()
  transactionId: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetBuyerResponse)
  buyerInformation: GetBuyerResponse;

  // @ApiProperty()
  // @ValidateNested()
  // @Type(() => SupplierInformationResponse)
  // supplierInformation: SupplierInformationResponse;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetOrderDetailsResponse)
  orderDetails: GetOrderDetailsResponse;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetPaymentTermResponse)
  paymentTerms: GetPaymentTermResponse;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GetCollateralResponse)
  security: GetCollateralResponse;

  // @ApiProperty()
  // @ValidateNested()
  // @Type(() => CreateTxDocResponse)
  // transactionDocuments: CreateTxDocResponse;
}
