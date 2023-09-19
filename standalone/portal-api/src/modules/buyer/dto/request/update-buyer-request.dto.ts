import { ApiProperty } from "@nestjs/swagger";
import { CreateBuyerCompanyRequest } from "./create-buyer-company-request.dto";
import { CreateBuyerSectorRequest } from "./create-buyer-sector-request.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdateBuyerRequest {
    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateBuyerCompanyRequest)
    company: CreateBuyerCompanyRequest;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateBuyerSectorRequest)
    sector: CreateBuyerSectorRequest;
}