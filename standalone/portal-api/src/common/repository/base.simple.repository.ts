import { ObjectLiteral, Repository } from 'typeorm';
import { patchRepositoryManager } from '../transaction/patch-typeorm-repository';

export class BaseSimpleRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {}

patchRepositoryManager(BaseSimpleRepository.prototype);
