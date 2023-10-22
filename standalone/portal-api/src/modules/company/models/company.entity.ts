import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { CompanyAddressEntity } from './company.address.entity';
import { CompanyTaxAndRevenueEntity } from './company.tax.and.revenue.entity';

@Entity({ name: 'Companies' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class CompanyEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  companyName: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  dateEstablished: Date;

  @Column()
  @Allow()
  phoneNumber: string;

  @Column({ nullable: true })
  @Allow()
  employeeCount?: number;

  @Column()
  @Allow()
  registrationNumbers: string;

  @OneToOne(
    () => CompanyTaxAndRevenueEntity,
    (taxAndRevenue) => taxAndRevenue.company,
  )
  @JoinColumn()
  taxAndRevenue?: CompanyTaxAndRevenueEntity;

  @OneToOne(() => CompanyAddressEntity, (address) => address.company)
  @JoinColumn()
  address: CompanyAddressEntity;
}
