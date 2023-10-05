import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSupplierRatingRequest {
   
    @ApiProperty({ example: 4 })
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @ApiProperty({ example: 'Rating Agency LTD' })
    @IsNotEmpty()
    @IsString()
    agencyName: string;
  

    @ApiProperty({ example: '2022-12-12' })
    @IsNotEmpty()
    @IsDateString()
    issuanceDate: Date;
}