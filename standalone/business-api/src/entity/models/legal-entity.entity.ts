import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LegalApplicationEntity } from './legal-application.entity';
import { LegalProductEntity } from './legal-product.entity';

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
  headquaters: string;

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

  @Column()
  @Allow()
  logo: string;

  @OneToMany(
    () => LegalProductEntity,
    (legalProduct) => legalProduct.legalEntity,
  )
  legalProducts: LegalProductEntity[];

  @OneToMany(
    () => LegalApplicationEntity,
    (LegalApplication) => LegalApplication.legalEntity,
  )
  legalApplications: LegalApplicationEntity[];
}
