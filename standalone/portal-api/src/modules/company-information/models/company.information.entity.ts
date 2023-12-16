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

@Entity({ name: 'CompanyInformation' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class CompanyInformationEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @Allow()
  employeeCount?: number;

  @OneToOne(() => CompanyAddressEntity, (address) => address.company)
  @JoinColumn()
  address: CompanyAddressEntity;
}
