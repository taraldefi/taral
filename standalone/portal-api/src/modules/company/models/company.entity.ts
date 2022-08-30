import { Allow } from 'class-validator';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyAddressEntity } from './company.address.entity';

@Entity({ name: 'Companies' })
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

  @OneToOne(() => SupplierEntity, (supplier) => supplier.company, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  supplier: SupplierEntity; 
  
}
