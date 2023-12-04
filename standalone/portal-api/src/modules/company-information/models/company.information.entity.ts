import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { CompanyAddressEntity } from './company.information.address.entity';
import { CompanyTaxAndRevenueEntity } from './company.information.tax.and.revenue.entity';

@Entity({ name: 'CompanyInformation' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class CompanyInformationEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  phoneNumber: string;

  @Column({ nullable: true })
  @Allow()
  employeeCount?: number;

  @Column()
  @Allow()
  registrationNumbers: string;

  @OneToMany(
    () => CompanyTaxAndRevenueEntity,
    (taxAndRevenue) => taxAndRevenue.companyInformation,
  )
  taxAndRevenue?: CompanyTaxAndRevenueEntity[];

  @OneToOne(() => CompanyAddressEntity, (address) => address.company)
  @JoinColumn()
  address: CompanyAddressEntity;
}
