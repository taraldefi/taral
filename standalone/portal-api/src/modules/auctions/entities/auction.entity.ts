import { Allow } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { AuctionStatus } from './auction.status';
import { AuctionBidEntity } from './auction.bid.entity';
import { TrackChanges } from 'src/common/decorators/track-changes.decorator';
import { CustomVersionableBaseEntity } from 'src/common/entity/custom-versionable.base.entity';

@Entity({ name: 'Auctions' })
export class AuctionEntity extends CustomVersionableBaseEntity {
  @Column()
  @Allow()
  @TrackChanges()
  auctionId: number;

  @Column()
  @Allow()
  @TrackChanges()
  endBlock: string;

  @Column({
    nullable: true,
  })
  @Allow()
  @TrackChanges()
  highestBid: string;

  @Column()
  @Allow()
  @TrackChanges()
  maker: string;

  @Column()
  @Allow()
  @TrackChanges()
  nftAsset: string;

  @Column({
    nullable: true,
  })
  @Allow()
  @TrackChanges()
  highestBidder: string;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.OPEN,
  })
  @TrackChanges()
  status: AuctionStatus;

  @OneToMany(
    () => AuctionBidEntity,
    (auctionBidEntity) => auctionBidEntity.auction,
  )
  bids: AuctionBidEntity[];
}
