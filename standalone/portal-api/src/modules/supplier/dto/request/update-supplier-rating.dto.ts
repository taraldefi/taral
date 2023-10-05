import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateSupplierRatingRequest {
   
    @ApiProperty({ example: 4 })
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @ApiProperty({ example: 'Rating Agency LTD' })
    @IsNotEmpty()
    @IsString()
    agencyName: string;
  

    @ApiProperty({ example: '12-12-2022' })
    @IsNotEmpty()
    @IsDateString()
    issuanceDate: Date;
}