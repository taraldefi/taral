import { Injectable } from '@nestjs/common';

import {
  canRead,
  canWrite,
  getFileHash,
  grantAccessToFile,
  IStorageFileRegister,
  IStorageFileUpdate,
  registerFile,
  revokeAccessFromFile,
  updateAccessToFile,
  updateFile,
} from '@libs/storage';

@Injectable()
export class FilesOnChainService {}
