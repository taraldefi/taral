import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SectorEntity } from 'src/modules/sectors/models/sector.entity';

@EntityRepository(SectorEntity)
export class SectorEntityRepository extends BaseRepository<SectorEntity> {}
