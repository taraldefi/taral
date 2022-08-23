import { Injectable, StreamableFile } from '@nestjs/common';
import { Storage } from '@modules/storage';
import { triggerError } from '../utils/trigger.error';

@Injectable()
export class LogoService {
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
