import { Entity, Column } from 'typeorm';
import { BaseHistory } from '../../history/entities/base.history.entity';
import { AuctionStatus } from 'src/modules/auctions/entities/auction.status';
import { Allow } from 'class-validator';

@Entity('auctions_history')
export class AuctionHistoryEntity extends BaseHistory {
  @Column()
  @Allow()
  auctionId: number;

  @Column()
  @Allow()
  endBlock: string;

  @Column({
    nullable: true,
  })
  @Allow()
  highestBid: string;

  @Column()
  @Allow()
  maker: string;

  @Column()
  @Allow()
  nftAsset: string;

  @Column({
    nullable: true,
  })
  @Allow()
  highestBidder: string;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.OPEN,
  })
  status: AuctionStatus;
}
