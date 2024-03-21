import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
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

  @Column({ nullable: true })
  confirmationDocument: boolean;

  @Column({ nullable: true })
  additionalDocument: boolean;

  @Column({ nullable: true })
  creditCardStatement: boolean;

  @OneToOne(
    () => QuickApplicationEntity,
    (application) => application.transactionDocuments,
  )
  application: QuickApplicationEntity;
}
