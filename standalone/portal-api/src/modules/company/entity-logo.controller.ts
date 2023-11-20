import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';
import { ApiFileResponse } from 'src/utils/api-file-response';
import { LogoService } from './services/logo.service';

@ApiTags('Logos')
@Controller({
  path: 'logo',
  version: '1',
})
export class EntityLogoController {
  constructor(private readonly logoService: LogoService) {}

  @ApiFileResponse('image/png')
  @Get('/:id')
  public async getLogo(@Param('id') id, @Res({ passthrough: true }) response) {
    const file = await this.logoService.getLogoByName(id);

    response.set({
      'Content-Type': 'image/pdf',
      'Content-Disposition': `attachment; filename="${id}.png"`,
    });

    return file;
  }
}
