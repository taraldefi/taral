import { Allow } from 'class-validator';
import {
  BuyerQuickApplicationEntity,
  SupplierQuickApplicationEntity,
} from 'src/modules/applications/models/quickapplication.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class LegalEntity extends EntityHelper {
  @Column()
  @Allow()
  name: string;

  @Column()
  @Allow()
  beneficialOwner: string;

  @Column()
  @Allow()
  abbreviation: string;

  @Column()
  @Allow()
  nationality: string;

  @Column()
  @Allow()
  headquarters: string;

  @Column()
  @Allow()
  industryType: string;

  @Column()
  @Allow()
  coreBusiness: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  incorporationDate: Date;

  @Column()
  @Allow()
  legalForm: string;

  @Column({ nullable: true })
  @Allow()
  logo: string;
}

@Entity({ name: 'Buyer_Entities' })
export class LegalBuyerEntity extends LegalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];

  @OneToMany(
    () => BuyerQuickApplicationEntity,
    (LegalApplication) => LegalApplication.legalEntity,
  )
  @JoinColumn()
  legalApplications: BuyerQuickApplicationEntity[];
}

@Entity({ name: 'Supplier_Entities' })
export class LegalSupplierEntity extends LegalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];

  @OneToMany(
    () => SupplierQuickApplicationEntity,
    (LegalApplication) => LegalApplication.legalEntity,
  )
  @JoinColumn()
  legalApplications: SupplierQuickApplicationEntity[];
}
