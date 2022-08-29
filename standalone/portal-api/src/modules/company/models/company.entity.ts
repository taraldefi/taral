import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
