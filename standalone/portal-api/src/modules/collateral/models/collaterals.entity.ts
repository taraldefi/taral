import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FacilityType } from '../enums/facility.enum';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';

@Entity({ name: 'Collaterals' })
export class CollateralEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: FacilityType })
  @Allow()
  facilityType: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @Allow()
  financingRatio: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  facilityAmount: number;

  @Column({ type: 'timestamptz' })
  @Allow()
  requestedTenure: Date;

  @Column()
  @Allow()
  requestedPurpose: string;

  @Column()
  @Allow()
  repaymentSource: string;

  @Column({ nullable: true })
  @Allow()
  collateralProviderInfluence: string;

  @Column({ nullable: true })
  @Allow()
  collateralProviderExperience: string;

  @OneToOne(() => QuickApplicationEntity, (application) => application.security)
  application: QuickApplicationEntity;
}
