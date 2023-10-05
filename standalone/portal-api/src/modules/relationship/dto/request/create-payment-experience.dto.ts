import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreatePaymentExperienceRequest {
    @ApiProperty({ example: 'Provider' })
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @ApiProperty({ example: 'Years' })
    @IsNotEmpty()
    @IsString()
    length: string;

    @ApiProperty({ example: '12' })
    @IsNotEmpty()
    @IsNumberString()
    noOfDeals: number;

    @ApiProperty({ example: '1000000' })
    @IsNotEmpty()
    @IsNumberString()
    avgBusinessVol: string;

    @ApiProperty({ example: 'ON_TIME' })
    @IsNotEmpty()
    @IsEnum(['ON_TIME', 'DELAYS'])
    history: string;

    @ApiProperty({ example: 'Explanation if there were delays in payment' })
    @IsNotEmpty()
    @IsString()
    delays: string;
}