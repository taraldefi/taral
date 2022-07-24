import { Allow } from 'class-validator';
import appConfig from 'src/config/app.config';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from './file.entity';

@Entity({ name: 'file_participants' })
export class FileParticipantEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  wallet: string;

  @Column({ type: 'timestamptz' }) // Recommended
  created: Date;

  @ManyToMany(() => FileEntity, (file) => file.participants, {
    cascade: true,
  })
  @JoinTable()
  files: FileEntity[];

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.created == undefined) {
      this.created = new Date();
    }
  }
}
