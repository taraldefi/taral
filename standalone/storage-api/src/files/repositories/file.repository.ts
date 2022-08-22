import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';

@EntityRepository(FileEntity)
export class FileRepository extends BaseRepository<FileEntity> {}
