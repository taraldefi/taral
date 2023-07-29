import { Allow } from 'class-validator';
import { BaseHistory } from 'src/modules/history/entities/base.history.entity';
import { Column, Entity } from 'typeorm';

@Entity('auction_bids_history')
export class AuctionBidHistoryEntity extends BaseHistory {
  @Column()
  @Allow()
  auctionId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  amount: number;

  @Column()
  @Allow()
  bidder: string;
}
