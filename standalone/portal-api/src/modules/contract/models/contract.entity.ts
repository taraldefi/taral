import { Allow } from 'class-validator';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { SupplierFinancialInformationEntity } from 'src/modules/financial/models/supplier.financial.info.entity';
import { SupplierRatingEntity } from 'src/modules/rating/models/supplier.rating.entity';
import { TransactionEntity } from 'src/modules/transaction/models/transaction.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Contracts' })
export class ContractEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  conoclusion: Date;

  @Column({type: 'bool'})
  @Allow()
  isSigned: boolean;

  @OneToOne(() => TransactionEntity, (transaction) => transaction.contract, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  transaction: TransactionEntity;
}
