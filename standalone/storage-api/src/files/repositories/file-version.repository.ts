import { BaseRepository } from 'src/core/modules/transaction';
import { EntityRepository } from 'typeorm';
import { FileVersionEntity } from '../entities/file-version.entity';

@EntityRepository(FileVersionEntity)
export class FileVersionRepository extends BaseRepository<FileVersionEntity> {}
