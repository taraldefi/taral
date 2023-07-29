import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import * as amqp from 'amqplib';
import * as winston from 'winston';
import { Counter, Registry } from 'prom-client';
import { StartAuctionService } from '../../auctionhistory/services/start.auction.service';
import { CancelAuctionService } from '../../auctionhistory/services/cancel.auction.service';
import { PlaceBidService } from '../../auctionhistory/services/place.bid.service';
import { CancelAuction, PlaceBid, StartAuction } from 'src/models';

class CancellablePromise<T> {
  private _promise: Promise<T>;
  private _reject: (reason?: any) => void;

  constructor(promise: Promise<T>) {
    let reject: (reason?: any) => void;

    this._promise = new Promise<T>((resolve, rejectOriginal) => {
      reject = rejectOriginal;

      promise.then(resolve, rejectOriginal);
    });

    this._reject = reject!;
  }

  get promise(): Promise<T> {
    return this._promise;
  }

  cancel(): void {
    this._reject({ cancelled: true });
  }
}

@Injectable()
export class RabbitmqService implements OnModuleInit, OnApplicationShutdown {
  private queueName = 'chainhook_queue';
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private consuming = false;

  private registry = new Registry();
  private successfulConnectionCounter = new Counter({
    name: 'rabbitmq_successful_connections_total',
    help: 'Total number of successful connections to RabbitMQ',
    registers: [this.registry],
  });
  private connectionErrorCounter = new Counter({
    name: 'rabbitmq_connection_errors_total',
    help: 'Total number of connection errors to RabbitMQ',
    registers: [this.registry],
  });

  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });

  private activePromises: CancellablePromise<void>[] = [];

  public constructor(
    private readonly startAuctionService: StartAuctionService,
    private readonly cancelAuctionService: CancelAuctionService,
    private readonly placeBidService: PlaceBidService,
  ) {}

  async onModuleInit() {
    await this.retryConnect();
    await this.startListening();
  }

  async onApplicationShutdown() {
    this.consuming = true;

    // Wait for all promises to finish or cancel them if they take more than 5 seconds
    await Promise.all(
      this.activePromises.map((cancellablePromise) =>
        Promise.race([
          cancellablePromise.promise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Promise timeout')), 5000),
          ),
        ]).catch((err) => {
          this.logger.error(`Error in onApplicationShutdown: ${err}`);
          cancellablePromise.cancel(); // Cancel the promise if it didn't finish on time
        }),
      ),
    );

    await this.stopListening();
    await this.closeConnection();
  }

  private addPromise(promise: Promise<void>): CancellablePromise<void> {
    const cancellablePromise = new CancellablePromise<void>(promise);

    this.activePromises.push(cancellablePromise);

    // When the promise completes, remove it from the active promises
    cancellablePromise.promise.then(
      () => this.removePromise(cancellablePromise),
      () => this.removePromise(cancellablePromise),
    );

    return cancellablePromise;
  }

  private removePromise(promise: CancellablePromise<void>): void {
    const index = this.activePromises.indexOf(promise);

    if (index !== -1) {
      this.activePromises.splice(index, 1);
    }
  }

  private async connect() {
    try {
      this.connection = await amqp.connect(
        'amqp://admin:supersecretpassword@localhost:5673',
      );
      this.connection.on('error', (err) => {
        this.logger.error(`Connection error: ${err}`);
        this.connection = null;
        this.connectionErrorCounter.inc();
      });
      this.connection.on('close', () => {
        this.logger.info(`Connection closed`);
        this.connection = null;
      });
      this.successfulConnectionCounter.inc();
    } catch (err) {
      this.logger.error(`Failed to connect: ${err}`);
      this.connectionErrorCounter.inc();
    }
  }

  private async createChannel() {
    if (!this.connection) {
      this.logger.error(`Cannot create a channel without a connection`);
      return;
    }

    try {
      this.channel = await this.connection.createChannel();
      this.channel.on('error', (err) => {
        this.logger.error(`Channel error: ${err}`);
        this.channel = null;
      });
      this.channel.on('close', () => {
        this.logger.info(`Channel closed`);
        this.channel = null;
      });
    } catch (err) {
      this.logger.error(`Failed to create a channel: ${err}`);
    }
  }

  private async retryConnect() {
    let retries = 0;

    while (!this.connection && retries < 5) {
      try {
        this.logger.info(`Attempting to connect (Attempt ${retries + 1})...`);
        await this.connect();
      } catch (err) {
        this.logger.error(`Failed to connect: ${err}`);
      }

      if (!this.connection) {
        const timeout = Math.pow(2, retries) * 1000;
        await new Promise((resolve) => setTimeout(resolve, timeout));
      }

      retries++;
    }

    if (!this.connection) {
      this.logger.error(`Failed to connect after retries`);
    }
  }

  async startListening() {
    if (!this.channel) {
      await this.createChannel();
    }

    if (this.channel) {
      await this.channel.assertQueue(this.queueName, { durable: false });

      const getChannelMessage = (queue: string, options: amqp.Options.Get) => {
        return new Promise<amqp.ConsumeMessage | null>((resolve, reject) => {
          this.channel
            ?.get(queue, options)
            .then((message: amqp.GetMessage | false) => {
              if (message !== false) {
                const consumeMessage: amqp.ConsumeMessage = {
                  fields: {
                    consumerTag: '',
                    deliveryTag: message.fields.deliveryTag, // Extract the delivery tag from the message
                    redelivered: false,
                    exchange: '',
                    routingKey: '',
                  },
                  properties: message.properties,
                  content: message.content,
                };
                resolve(consumeMessage);
              } else {
                resolve(null);
              }
            })
            .catch((err) => {
              if (this.consuming) {
                console.log('In get channel message catch', err);
                reject(err);
              } else {
                resolve(null);
              }
            });
        });
      };

      const reconnect = async () => {
        // Close the existing channel
        if (this.channel) {
          await this.channel.close();
          this.channel = null;
        }

        // Reconnect to RabbitMQ
        await this.connect();
      };

      const processMessage = async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
          let success = false;
          try {
            this.logger.info(`Received message: ${msg.content.toString()}`);
            await this.processMessageAsync(msg); // Process the message asynchronously
            success = true;
          } catch (error) {
            this.logger.error(`Error processing message: ${error}`);
            await reconnect(); // Re-establish the channel connection
          } finally {
            if (success) {
              this.channel?.ack(msg); // Acknowledge the message if processing is successful
            } else {
              this.channel?.nack(msg, false, true); // Reject (nack) the message and requeue it
            }
          }
        }
      };

      const consumeNextMessage = async () => {
        if (this.consuming) {
          const promise = getChannelMessage(this.queueName, { noAck: false })
            .then(processMessage)
            .catch((err) => {
              this.logger.error(`Error in consumeNextMessage: ${err}`);
              // other error handling logic here
            });

          this.addPromise(promise)
            .promise.then(consumeNextMessage)
            .catch((err) => {
              this.logger.error(`Error in consumeNextMessage: ${err}`);
              // other error handling logic here
            });
        }
      };

      this.consuming = true;
      this.logger.info(`Started listening to ${this.queueName}`);

      await consumeNextMessage();

      this.logger.info(`Stopped listening to ${this.queueName}`);
    }
  }

  async processMessageAsync(msg: amqp.ConsumeMessage) {
    if (msg) {
      console.log('Consuming message');

      const content = msg.content.toString();
      const json = JSON.parse(content);
      const { data } = json;
      const dataJson = JSON.parse(data);

      let type = dataJson.action.value as string;

      //
      // A few things have been changed for this implementation:
      // * The action id is not unique intentionally so we can run the integration tests multiple times.
      //   In production, you should make sure the action id is unique.
      // * Not all messages are, obcvously, implemented but the ones that are, serve as examples.
      //

      switch (type) {
        case 'place-bid':
          this.logger.info('Place bid event received');
          const placeBidModel = dataJson as PlaceBid;
          await this.placeBidService.placeBid(placeBidModel);
          break;
        case 'place-bid-return-previous-bid':
          this.logger.info('Place bid return previous bid event received');
          break;
        case 'start-auction':
          this.logger.info('Start Auction event received');

          const startAuctionModel = dataJson as StartAuction;
          await this.startAuctionService.startAuction(startAuctionModel);
          break;
        case 'set-whitelisted':
          this.logger.info('Whitelist event received');
          break;
        case 'cancel-auction':
          this.logger.info('Cancel Auction event received');
          const cancelAuctionModel = dataJson as CancelAuction;
          await this.cancelAuctionService.cancelAuction(cancelAuctionModel);
          break;
        default:
          this.logger.info('Unknown event received');
          break;
      }
    }
  }

  async stopListening() {
    if (this.channel && this.consuming) {
      this.consuming = false;

      await this.channel.cancel(this.queueName);
      this.logger.info(`Stopped listening to ${this.queueName}`);
    }
  }

  private async closeConnection() {
    if (this.connection) {
      await this.connection.close();
      this.logger.info(`Connection to RabbitMQ closed`);
    }
  }

  getMetrics() {
    return this.registry.metrics();
  }
}
