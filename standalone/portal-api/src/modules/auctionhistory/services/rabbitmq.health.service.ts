import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RabbitMQHealthService {
  constructor(
  ) {

  }

  public async checkClientStatus() {
    try{
      const response = await axios.get('http://localhost:15673/api/aliveness-test/%2F', {
        auth: {
          username: 'admin',
          password: 'supersecretpassword'
        }
      });

      if (response.data.status === 'ok') {
        console.log('Connected to RabbitMQ');
      } else {
        console.log('Failed to connect to RabbitMQ');
      }
    } catch (error) {
      console.log('Error during aliveness test', error);
    }
  }
}