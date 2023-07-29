import { Allow } from 'class-validator';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AuctionEntity } from './auction.entity';
import { Exclude } from 'class-transformer';
import { TrackChanges } from 'src/common/decorators/track-changes.decorator';

@Entity({ name: 'Bids' })
export class AuctionBidEntity extends CustomBaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  @TrackChanges()
  amount: number;

  @Column()
  @Allow()
  @TrackChanges()
  bidder: string;

  @ManyToOne(() => AuctionEntity, (auction) => auction.bids, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Exclude()
  auction: AuctionEntity;
}
