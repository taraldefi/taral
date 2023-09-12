import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FacilityType } from '../enums/facility.enum';

@Entity({ name: 'Collaterals' })
export class CollateralEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: FacilityType })
  @Allow()
  facilityType: string;

  @Column({ type: 'decimal', precision: 2, scale: 2, default: 0 })
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

  @Column()
  @Allow()
  collateralProviderInfluence: string;

  @Column()
  @Allow()
  collateralProviderExperience: string;
}
