import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { BaseHistory } from '../entities/base.history.entity';

export abstract class BaseHistorySubscriber<
  T extends { id: string },
  H extends BaseHistory,
> implements EntitySubscriberInterface<T>
{
  constructor(
    protected connection: Connection,
    protected entity: new () => T,
    protected history: new () => H,
  ) {}

  listenTo() {
    return this.entity;
  }

  afterInsert(event: InsertEvent<T>) {
    this.insertIntoHistory(event, 'insert');
  }

  afterUpdate(event: UpdateEvent<T>) {
    this.insertIntoHistory(event, 'update', event.updatedColumns);
  }

  afterRemove(event: RemoveEvent<T>) {
    this.insertIntoHistory(event, 'delete');
  }

  protected abstract copyEntityToHistory(entity: T, history: H): void;

  private async insertIntoHistory(
    event: InsertEvent<T> | UpdateEvent<T> | RemoveEvent<T>,
    action: H['action'],
    updatedColumns = [],
  ) {
    const entity = event.entity as T;

    const history = new this.history();
    history.action = action;
    history.createdAt = new Date();

    history.changes = updatedColumns.map((column) => ({
      name: column.propertyName,
      new_value: entity[column.propertyName],
    }));

    this.copyEntityToHistory(entity, history);
    await event.manager.save(history);
  }

  protected getEntityChanges(
    event: UpdateEvent<T>,
  ): Array<{ name: string; new_value: any }> {
    return event.updatedColumns.map((column) => ({
      name: column.propertyName,
      new_value: column.getEntityValue(event.entity),
    }));
  }
}
