import { Controller, OnModuleInit } from '@nestjs/common';
import { RabbitMQHealthService } from '../services/rabbitmq.health.service';
import { RabbitmqService } from '../services/rabbitmq.service';

@Controller()
export class AuctionSubscriberController implements OnModuleInit {
  constructor(
    private readonly healthService: RabbitMQHealthService,
    // This is how the rabbitmq service gets started, by injecting it in the controller.
    //
    private readonly rabbitMqService: RabbitmqService,
  ) {}

  onModuleInit() {
    console.log(`The auction subscriber module has been initialized.`);
    this.healthService.checkClientStatus();
  }
}
