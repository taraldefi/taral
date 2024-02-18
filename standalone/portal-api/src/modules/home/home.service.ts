import { Injectable } from '@nestjs/common';
import { Configuration } from '../../configuration';

@Injectable()
export class HomeService {
  constructor() {}

  appInfo() {
    return { name: Configuration.app.name };
  }
}
