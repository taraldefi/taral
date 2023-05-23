import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';

@EntityRepository(FileEntity)
export class FileRepository extends BaseRepository<FileEntity> {}
