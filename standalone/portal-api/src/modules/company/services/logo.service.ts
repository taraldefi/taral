import { Injectable, StreamableFile } from '@nestjs/common';
import { Storage } from '@modules/storage';
import { triggerError } from '../../../common/trigger.error';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable()
export class LogoService extends BaseService {

  constructor(public logger: CoreLoggerService) {
    super(logger);
  }

  public async getLogoByName(id: string): Promise<StreamableFile> {
    if (!id) {
      throw triggerError('logo-id-missing');
    }

    let fileName = id.endsWith('.png') ? id : `${id}.png`;

    const storage = Storage.disk('files');

    var buffer = await storage.get(fileName);

    return new StreamableFile(buffer);
  }
}
