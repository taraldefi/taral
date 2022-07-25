import { BaseRepository } from 'src/core/modules/transaction';
import { EntityRepository } from 'typeorm';
import { FileParticipantEntity } from '../entities/file-participant.entity';

@EntityRepository(FileParticipantEntity)
export class FileParticipantRepository extends BaseRepository<FileParticipantEntity> {}
