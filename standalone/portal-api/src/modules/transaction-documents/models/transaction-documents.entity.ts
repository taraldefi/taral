import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TransactionDocuments' })
export class TransactionDocumentEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  confirmationDocument: FileEntity;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  additionalDocument: FileEntity;

  @OneToOne(
    () => QuickApplicationEntity,
    (application) => application.transactionDocuments,
  )
  application: QuickApplicationEntity;
}
