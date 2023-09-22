import { FileEntity } from 'src/modules/files/entities/file.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TransactionDocuments' })
export class TransactionDocEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  confirmationDocument: FileEntity['id'];

  @OneToOne(() => FileEntity)
  @JoinColumn()
  additionalDocument: FileEntity['id'];
}
