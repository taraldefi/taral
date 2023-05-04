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
    example: 'c074f1ae-3f34-4b95-a103-328e94ef733a',
  })
  id: string;

  @ApiProperty({ example: 'signed-message' })
  signedHash: string;
}
