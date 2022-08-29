import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ExternalRatings' })
export class RatingEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  rating: number;

  @Column()
  @Allow()
  agencyName: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  issuanceDate: Date;
}
