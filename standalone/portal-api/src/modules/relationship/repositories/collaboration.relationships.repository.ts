import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { CollaborationRelationshipEntity } from '../models/collaboration.relationship.entity';

@EntityRepository(CollaborationRelationshipEntity)
export class CollaborationRelationshipsRepository extends BaseRepository<CollaborationRelationshipEntity> {}
