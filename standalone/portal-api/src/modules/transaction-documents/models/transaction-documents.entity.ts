import { FileEntity } from 'src/modules/files/entities/file.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TransactionDocuments' })
export class TxDocEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  confirmationDocument: FileEntity;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  additionalDocument: FileEntity;
}
