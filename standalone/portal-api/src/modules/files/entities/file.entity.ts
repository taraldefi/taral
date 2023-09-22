import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileParticipantEntity } from './file-participant.entity';
import { FileVersionEntity } from './file-version.entity';

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

  @OneToMany(() => FileVersionEntity, (fileVersion) => fileVersion.file)
  versions: FileVersionEntity[];

  @ManyToMany(
    () => FileParticipantEntity,
    (fileParticipant) => fileParticipant.files,
  )
  participants: FileParticipantEntity[];

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
