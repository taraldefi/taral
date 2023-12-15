import { Allow } from 'class-validator';
import appConfig from 'src/config/app.config';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from './file.entity';

@Entity({ name: 'file_versions' })
export class FileVersionEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  hash: string;

  @Allow()
  @Column()
  path: string;

  @Column({ type: 'timestamptz' }) // Recommended
  created: Date;

  @Column()
  @Allow()
  on_disk_name: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  file: FileEntity;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.created == undefined) {
      this.created = new Date();
    }
  }
}
