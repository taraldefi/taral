import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuctionHistoryService } from '../services/auction.history.service';

@ApiTags('auctionhistory')
@Controller({
  path: 'auctionhistory',
  version: '1',
})
export class AuctionHistoryController {
  constructor(private readonly service: AuctionHistoryService) {}

  @Get('/:id')
  async getEntity(@Param('id') auctionId: number) {
    return await this.service.getHumanReadableAuctionHistory(auctionId);
  }
}
