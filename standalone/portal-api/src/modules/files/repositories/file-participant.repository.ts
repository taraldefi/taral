import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { FileParticipantEntity } from '../entities/file-participant.entity';

@EntityRepository(FileParticipantEntity)
export class FileParticipantRepository extends BaseRepository<FileParticipantEntity> {}
