import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyInformationEntity } from './company.information.entity';

@Entity({ name: 'CompanyAddresses' })
export class CompanyAddressEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  city: string;

  @Column()
  @Allow()
  addressLine1: string;

  @Column()
  @Allow()
  addressLine2: string;

  @Column()
  @Allow()
  postalCode: string;

  @OneToOne(() => CompanyInformationEntity, (company) => company.address, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  company: CompanyInformationEntity;
}
