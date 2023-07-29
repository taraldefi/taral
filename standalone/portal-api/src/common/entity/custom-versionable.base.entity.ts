import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { TrackChanges } from '../decorators/track-changes.decorator';
import { CustomBaseEntity } from './custom-base.entity';
  
  /**
   * custom base entity
   */
  export abstract class CustomVersionableBaseEntity extends CustomBaseEntity {  
    @Column({ type: 'char', length: 64 })
    @TrackChanges()
    hash: string;
  }
  