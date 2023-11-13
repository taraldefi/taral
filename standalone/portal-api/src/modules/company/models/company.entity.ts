import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity({ name: 'Companies' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class CompanyEntity extends EntityHelper {
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
}
