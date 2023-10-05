import { ApiProperty } from "@nestjs/swagger";

export class GetSupplierResponse {
    @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
    id: string;

    @ApiProperty({ example: 'Home Inc.' })
    companyName: string;

    @ApiProperty({ example: '2021-05-21T00:00:00.000Z' })
    dateEstablished: Date;

    @ApiProperty({ example: 100 })
    employeeCount?: number;

    @ApiProperty({ example: '123456789' })
    registrationNumbers: string;
}