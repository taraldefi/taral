import { Allow } from 'class-validator';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { CollateralEntity } from 'src/modules/collateral/models/collaterals.entity';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { PaymentTermEntity } from 'src/modules/payment-term/models/payment-term.entity';
import { TransactionDocumentEntity } from 'src/modules/transaction-documents/models/transaction-documents.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { ApplicationStatus } from '../enums/status.enum';
import { OrderDetailEntity } from 'src/modules/order-detail/models/order-detail.entity';
import { BuyerCompanyInformationEntity } from 'src/modules/company-information/models/buyer.company.information.entity';
import { ApplicationPaymentMethod } from '../enums/paymentmethod.enum';

@Entity({ name: 'QuickApplications' })
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

  @Column({ nullable: true })
  @Allow()
  onchainPrincipal: string;

  @Column({ nullable: true })
  @Allow()
  sellerPrincipal: string;

  @Column({ nullable: true })
  @Allow()
  purchaseOrderId: string;

  @Column({ type: 'enum', enum: ApplicationPaymentMethod, nullable: true })
  @Allow()
  paymentMethod: string;

  @Column()
  @Allow()
  exporterName: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  issuanceDate: Date;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  endDate: Date;

  @Column({ type: 'enum', enum: ApplicationStatus })
  @Allow()
  status: string;

  @OneToOne(() => BuyerCompanyInformationEntity)
  @JoinColumn()
  @Allow()
  buyerInformation: BuyerCompanyInformationEntity;

  @ManyToOne(() => SupplierCompanyEntity, (supplier) => supplier.applications)
  @Allow()
  supplierInformation: SupplierCompanyEntity;

  @OneToOne(() => PaymentTermEntity, (paymentTerm) => paymentTerm.application)
  @JoinColumn()
  @Allow()
  paymentTerms: PaymentTermEntity;

  @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.application)
  @JoinColumn()
  @Allow()
  orderDetails: OrderDetailEntity;

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

  @ManyToOne(
    () => BuyerCompanyEntity,
    (buyerCompany) => buyerCompany.applications,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  company: BuyerCompanyEntity;
}
