import { FileEntity } from 'src/modules/files/entities/file.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TransactionDocuments' })
export class TransactionDocumentEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => FileEntity, (file) => file.transactionDocuments)
  documents: FileEntity[];
}
