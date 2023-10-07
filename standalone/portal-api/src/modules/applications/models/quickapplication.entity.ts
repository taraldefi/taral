import { Allow } from 'class-validator';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';
import { CollateralEntity } from 'src/modules/collateral/models/collaterals.entity';
import {
  LegalBuyerEntity,
  LegalSupplierEntity,
} from 'src/modules/entity/models/legal-entity.entity';
import { OrderDetailEntity } from 'src/modules/order-detail/models/order-detail.entity';
import { PaymentTermEntity } from 'src/modules/payment-term/models/payment-term.entity';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { TransactionDocumentEntity } from 'src/modules/transaction-documents/models/transaction-documents.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatus } from '../enums/status.enum';

@Entity({ name: 'Base_Quick_Applications' })
export abstract class QuickApplicationEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  title: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  issuanceDate: Date;

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

@Entity({ name: 'Buyer_Quick_Applications' })
export class BuyerQuickApplicationEntity extends QuickApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => CollaborationRelationshipEntity,
    (relationship) => relationship.supplier,
  )
  @JoinColumn()
  @Allow()
  relationshipWithSupplier: CollaborationRelationshipEntity;

  @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.application)
  @JoinColumn()
  @Allow()
  orderDetails: OrderDetailEntity;

  @ManyToOne(
    () => LegalBuyerEntity,
    (legalEntity) => legalEntity.legalApplications,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  legalEntity: LegalBuyerEntity;
}

@Entity({ name: 'Supplier_Quick_Applications' })
export class SupplierQuickApplicationEntity extends QuickApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => CollaborationRelationshipEntity,
    (relationship) => relationship.supplier,
  )
  @JoinColumn()
  @Allow()
  relationshipWithBuyer: CollaborationRelationshipEntity;

  // @OneToOne(() => ContractEntity, (contract) => contract.application)
  // @JoinColumn()
  // @Allow()
  // contract: ContractEntity;

  @ManyToOne(
    () => LegalSupplierEntity,
    (legalEntity) => legalEntity.legalApplications,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  legalEntity: LegalSupplierEntity;
}
