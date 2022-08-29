import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
