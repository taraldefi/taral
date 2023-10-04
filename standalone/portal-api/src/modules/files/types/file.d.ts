import { FileEntity } from '../entities/file.entity';
import { CreateFileResponse } from './create-file-response.dto';

export type CreateFile = {
  response: CreateFileResponse;
  savedFileEntity: FileEntity;
};
