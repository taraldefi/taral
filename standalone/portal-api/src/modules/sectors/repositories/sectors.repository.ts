import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { SectorEntity } from '../models/sector.entity';

@EntityRepository(SectorEntity)
export class SectorsRepository extends BaseRepository<SectorEntity> {}
