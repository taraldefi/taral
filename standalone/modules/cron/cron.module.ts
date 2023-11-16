import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { CRON_MODULE_CONFIG } from "./constants";
import { cronFactory } from "./factories";
import {
  CronConfigFactory,
  CronModuleAsyncConfig,
  CronModuleConfig,
  CronQueueConfig,
} from "./interfaces";
import { CronExplorer, CronMetadataAccessor } from "./providers";
import { AgendaOrchestrator } from "./providers/cron.orchestrator";
import { DatabaseService } from "./providers/database.service";
import { getQueueConfigToken, getQueueToken } from "./utils";

@Module({
  imports: [DiscoveryModule],
  providers: [],
})
export class CronModule {
  static forRoot(config: CronModuleConfig): DynamicModule {
    const configProviders: Provider[] = [
      {
        provide: CRON_MODULE_CONFIG,
        useValue: config,
      },
      DatabaseService,
      CronMetadataAccessor,
      CronExplorer,
      AgendaOrchestrator,
    ];

    return {
      global: true,
      module: CronModule,
      providers: configProviders,
      exports: configProviders,
    };
  }

  static forRootAsync(
    config: CronModuleAsyncConfig<CronModuleConfig>,
  ): DynamicModule {
    const providers = this.createAsyncProviders<CronModuleConfig>(config);

    return {
      global: true,
      module: CronModule,
      imports: config.imports || [],
      providers: [
        ...providers,
        DatabaseService,
        CronMetadataAccessor,
        CronExplorer,
        AgendaOrchestrator,
        ...(config.extraProviders || []),
      ],
      exports: providers,
    };
  }

  static registerQueue(
    name: string,
    config: CronQueueConfig = {},
  ): DynamicModule {
    const queueToken = getQueueToken(name);

    const queueConfigToken = getQueueConfigToken(name);

    const configDefaults = {
      autoStart: true,
    };

    const providers: Provider[] = [
      {
        provide: queueConfigToken,
        useValue: { ...configDefaults, ...config },
      },
      {
        provide: queueToken,
        useFactory: cronFactory,
        inject: [queueConfigToken, CRON_MODULE_CONFIG],
      },
    ];

    return {
      module: CronModule,
      providers,
      exports: providers,
    };
  }

  private static createAsyncProviders<T>(
    config: CronModuleAsyncConfig<T>,
  ): Provider[] {
    if (config.useExisting || config.useFactory) {
      return [this.createAsyncOptionsProvider(config)];
    }

    const useClass = config.useClass as Type<CronConfigFactory<T>>;

    return [
      this.createAsyncOptionsProvider<T>(config),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider<T>(
    config: CronModuleAsyncConfig<T>,
  ): Provider {
    if (config.useFactory) {
      return {
        provide: CRON_MODULE_CONFIG,
        useFactory: config.useFactory,
        inject: config.inject || [],
      };
    }

    const inject = [
      (config.useClass || config.useExisting) as Type<CronConfigFactory<T>>,
    ];

    return {
      provide: CRON_MODULE_CONFIG,
      useFactory: async (optionsFactory: CronConfigFactory<T>) =>
        optionsFactory.createAgendaConfig(),
      inject,
    };
  }
}
