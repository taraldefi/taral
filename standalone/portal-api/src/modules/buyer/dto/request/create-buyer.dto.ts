import { ApiProperty } from "@nestjs/swagger";
import { CreateBuyerCompanyRequest } from "./create-buyer-company.dto";
import { CreateBuyerSectorRequest } from "./create-buyer-sector.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateBuyerRequest {
    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateBuyerCompanyRequest)
    company: CreateBuyerCompanyRequest;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateBuyerSectorRequest)
    sector: CreateBuyerSectorRequest;
}