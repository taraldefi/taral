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
  employeeCount?: number;

  @Column()
  @Allow()
  taxNumber: string;

  @Column()
  @Allow()
  registrationNumbers: string;

  @OneToOne(() => CompanyAddressEntity, (address) => address.company)
  @JoinColumn()
  address: CompanyAddressEntity;
}
