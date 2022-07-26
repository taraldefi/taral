import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileResponse {
  @ApiProperty({ example: 'file.pdf' })
  name: string;

  @ApiProperty({
    example:
      '0x39373839393763306535616630353865633736393535333062643163313633393430656461333935393734633939356165373665386463313131343638363235',
  })
  hash: string;

  @ApiProperty({
    example: 1
  })
  id: number;

  @ApiProperty({ example: 'signed-message' })
  signedHash: string;
}
