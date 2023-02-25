import {
  ModuleMetadata,
  Type,
  FactoryProvider,
  Provider,
} from '@nestjs/common';
import { AgendaConfig } from 'agenda';

export type CronModuleConfig = AgendaConfig;

export type CronQueueConfig = Omit<CronModuleConfig, 'mongo' | 'db'> & {
  autoStart?: boolean;
};

export interface CronConfigFactory<T> {
  createAgendaConfig(): Promise<T> | T;
}

export interface CronModuleAsyncConfig<T>
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<CronConfigFactory<T>>;
  useClass?: Type<CronConfigFactory<T>>;
  useFactory?: (...args: any[]) => Promise<T> | T;
  inject?: FactoryProvider['inject'];
  extraProviders?: Provider[];
}
