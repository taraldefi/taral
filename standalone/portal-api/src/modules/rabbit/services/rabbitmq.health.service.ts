import { Injectable } from '@nestjs/common';
import axios from 'axios';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class RabbitMQHealthService extends BaseService {
  
  constructor(public logger: CoreLoggerService) {
    super(logger);
  }

  public async checkClientStatus() {
    try {
      const response = await axios.get(
        'http://localhost:15673/api/aliveness-test/%2F',
        {
          auth: {
            username: 'admin',
            password: 'supersecretpassword',
          },
        },
      );

      if (response.data.status === 'ok') {
        console.log('Connected to RabbitMQ');
      } else {
        console.log('Failed to connect to RabbitMQ');
      }
    } catch (error) {
      this.Logger.error('Error during aliveness test', error);
    }
  }
}
