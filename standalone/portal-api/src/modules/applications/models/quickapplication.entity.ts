import { Allow } from 'class-validator';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';
import { CollateralEntity } from 'src/modules/collateral/models/collaterals.entity';

import { PaymentTermEntity } from 'src/modules/payment-term/models/payment-term.entity';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { TransactionDocumentEntity } from 'src/modules/transaction-documents/models/transaction-documents.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { ApplicationStatus } from '../enums/status.enum';

@Entity({ name: 'Quick_Applications' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class QuickApplicationEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Allow()
  applicationNumber: string;

  @Column()
  @Allow()
  title: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  issuanceDate: Date;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  endDate: Date;

  @Column({ type: 'enum', enum: ApplicationStatus })
  @Allow()
  status: string;

  @OneToOne(() => BuyerEntity, (buyer) => buyer.application)
  @JoinColumn()
  @Allow()
  buyerInformation: BuyerEntity;

  @OneToOne(() => SupplierEntity, (supplier) => supplier.application)
  @JoinColumn()
  @Allow()
  supplierInformation: SupplierEntity;

  @OneToOne(() => PaymentTermEntity, (paymentTerm) => paymentTerm.application)
  @JoinColumn()
  @Allow()
  paymentTerms: PaymentTermEntity;

  @OneToOne(() => CollateralEntity, (collateral) => collateral.application)
  @JoinColumn()
  @Allow()
  security: CollateralEntity;

  @OneToOne(
    () => TransactionDocumentEntity,
    (transactionDocument) => transactionDocument.application,
  )
  @JoinColumn()
  @Allow()
  transactionDocuments: TransactionDocumentEntity;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  createdAt: Date;
}
