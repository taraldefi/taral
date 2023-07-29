import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChainhookResponse } from './chainhook/ChainhookResponse';
import { Event } from './chainhook/Event';
import { cvToValue, deserializeCV } from '@stacks/transactions';
import { RabbitMqPublisherService } from './rabbitmq/rabbitmq.publisher.service';

//TODO: Uncomment this when you have the ApiKeyAuthGuard working with the chainhook service
// @UseGuards(ApiKeyAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly rabbitMqPublishingService: RabbitMqPublisherService) {}

  @Get()
  getStatus(): string {
    return 'RabbitMQ Chainhook Service v.0.0.1';
  }

  @Post('chainhook')
  async chainhook(@Body() body: any): Promise<void> {
    const chainhook = body as ChainhookResponse;

    console.log(JSON.stringify(chainhook, null, 2));

    const printEvents: Event[] = [];

    const transactions = chainhook.apply
      .map((apply) => apply.transactions)
      .reduce(function (a, b) {
        return a.concat(b);
      }, []);

    for (const transaction of transactions) {
      if (transaction.metadata.success) {
        //
        // check the events of the metadata

        const transactionPrintEvents = (transaction.metadata.receipt.events || []).filter((event) => event.type === 'SmartContractEvent' && event.data.topic == 'print');

        printEvents.push(...transactionPrintEvents);
      }
    }

    for (const printEvent of printEvents) {
      const hexData = printEvent.data.raw_value.replace('0x', '');
      const printPayloadCV = deserializeCV(Buffer.from(hexData, 'hex'));
      const printPayload = cvToValue(printPayloadCV);

      console.log(JSON.stringify(printPayload));

      console.log('---------------------------------------');

      // await this.rabbitMqPublishingService.publishMessage('rabbitmq_chainhook_event', JSON.stringify(printPayload));

      console.log('Published message');
    }

    console.log('Handled message, waiting for a new one');
  }
}
