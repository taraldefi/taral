import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'file' })
export class FileEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  original_name: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  created: Date;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  last_updated: Date;

  @AfterLoad()
  @AfterInsert()
  updateData() {
    if (this.created == undefined) {
      this.created = new Date();
    }

    if (this.last_updated == undefined) {
      this.last_updated = new Date();
    }
  }
}
