import { createHash } from 'crypto';
import { METADATA_KEY } from 'src/common/decorators/track-changes.decorator';
import {
  runOnTransactionCommit,
  runOnTransactionComplete,
  runOnTransactionRollback,
} from 'src/common/transaction/hook';
import { BaseHistory } from 'src/modules/history/entities/base.history.entity';

import * as winston from 'winston';
import { loggingLevel } from '../../modules/logger/logger';
import { Configuration } from '../../configuration';
import { SeqTransport } from '@datalust/winston-seq';

export abstract class BaseService {
  protected readonly Logger: winston.Logger;

  protected constructor(
  ) {

    const logLevel = Configuration.logging.level as loggingLevel;
    const seqConfig = Configuration.seqConfig;

    this.Logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(  /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: {  application: 'taral' },
      transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new SeqTransport({
          serverUrl: seqConfig.url,
          apiKey: seqConfig.apiKey,
          onError: (e => { console.error(e) }),
          handleExceptions: true,
          handleRejections: true,
        })
      ]
    });
  }

  protected setupTransactionHooks() {
    runOnTransactionRollback((cb) =>
      this.Logger.error(`[ROLLBACK] Error: ${cb.message}`),
    );

    runOnTransactionComplete((_) =>
      this.Logger.info('[COMMIT] Transaction Complete'),
    );
    runOnTransactionCommit(() =>
      this.Logger.info('[COMMIT] Transaction Commit'),
    );
  }

  protected async insertIntoHistory<
    T extends { id: number },
    H extends BaseHistory,
  >(
    historyFunc: new () => H,
    oldEntity: T,
    newEntity: T,
    action: H['action'],
    copyEntityToHistory: (entity: T, history: H) => void,
    save: (history: H) => Promise<H>,
  ) {
    this.Logger.info('Inside insertIntoHistory');

    const entity = newEntity;

    const history = new historyFunc();
    history.action = action;
    history.createdAt = new Date();

    this.Logger.info('Inside insertIntoHistory - build changes');

    history.changes = this.buildChanges(oldEntity, newEntity);

    this.Logger.info('Inside insertIntoHistory - copy entity to history');

    copyEntityToHistory(entity, history);

    this.Logger.info('Inside insertIntoHistory - awaiting save');
    console.log(this.stringify(history));

    await save(history);
  }

  protected calculateHash(entity: any): string {
    const properties: Array<string | symbol> =
      Reflect.getMetadata(METADATA_KEY, entity.constructor) || [];

    const obj: { [key: string]: any } = {};

    for (const key of properties) {
      if (entity.hasOwnProperty(key)) {
        obj[String(key)] = entity[key];
      }
    }

    const str = this.stringify(obj);
    const hash = createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
  }

  private buildChanges<T extends { id: number }>(
    oldEntity: T,
    newEntity: T,
  ): Array<{ name: string; old_value: any; new_value: any }> {
    const changes = [];

    const decoratedProperties: Array<string | symbol> = Reflect.getMetadata(
      METADATA_KEY,
      newEntity.constructor,
    );

    for (const key of decoratedProperties) {
      // Skip if the property is not a direct property of newEntity
      if (!newEntity.hasOwnProperty(key)) {
        continue;
      }

      if (!oldEntity || newEntity[key] !== oldEntity[key]) {
        changes.push({
          name: key,
          old_value: oldEntity ? oldEntity[key] : null,
          new_value: newEntity[key],
        });
      }
    }

    return changes;
  }

  private stringify(obj: any): string {
    const cache = new Set();
    const replacer = (_, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          // Duplicate reference found, discard key
          return;
        }
        // Store value in our set
        cache.add(value);
      }
      return value;
    };

    return JSON.stringify(obj, replacer, 2);
  }
}
