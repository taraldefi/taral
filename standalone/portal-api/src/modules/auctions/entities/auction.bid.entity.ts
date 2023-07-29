import { Allow } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AuctionEntity } from './auction.entity';
import { Exclude } from 'class-transformer';
import { TrackChanges } from 'src/common/decorators/track-changes.decorator';
import { CustomVersionableBaseEntity } from 'src/common/entity/custom-versionable.base.entity';

@Entity({ name: 'Bids' })
export class AuctionBidEntity extends CustomVersionableBaseEntity {
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
