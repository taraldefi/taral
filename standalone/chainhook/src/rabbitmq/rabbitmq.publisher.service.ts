import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQService } from './constants';

@Injectable()
export class RabbitMqPublisherService {
    constructor(
        @Inject(RabbitMQService) private client: ClientProxy,
    ) {
        
    }

    async publishMessage(pattern: string, message: string): Promise<void> {
        await this.client.emit(pattern, message).toPromise();
    }
}