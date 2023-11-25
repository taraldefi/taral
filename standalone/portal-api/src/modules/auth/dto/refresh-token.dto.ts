import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    /**
     * refresh token
     */
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}