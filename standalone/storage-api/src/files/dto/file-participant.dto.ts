import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FileParticipantDto {
    @ApiProperty({ example: '0x000000000000000' })
    @IsNotEmpty()
    @IsString()
    signature: string;
}