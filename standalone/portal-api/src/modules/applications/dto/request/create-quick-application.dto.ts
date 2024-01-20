import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuickApplicationRequest {
  @ApiProperty({ example: 'verner_ullrich' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM' })
  @IsNotEmpty()
  @IsString()
  onChainPrincipal: string;

  @ApiProperty({ example: '05159674-06ea-4bc2-b750-603b0f454025' })
  @IsNotEmpty()
  @IsString()
  entityId: string;
}
