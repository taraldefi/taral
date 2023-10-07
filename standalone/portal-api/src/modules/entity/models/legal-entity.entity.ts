import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LegalApplicationEntity } from './legal-application.entity';
import { LegalProductEntity } from './legal-product.entity';
import {
  BuyerQuickApplicationEntity,
  QuickApplicationEntity,
} from 'src/modules/applications/models/quickapplication.entity';

@Entity({ name: 'legal-entity' })
export class LegalEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(
    () => LegalProductEntity,
    (legalProduct) => legalProduct.legalEntity,
  )
  legalProducts: LegalProductEntity[];

  @OneToMany(
    () => BuyerQuickApplicationEntity,
    (LegalApplication) => LegalApplication.legalEntity,
  )
  @JoinColumn()
  legalApplications: BuyerQuickApplicationEntity[];
}
