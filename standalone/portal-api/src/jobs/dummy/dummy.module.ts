import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import Agenda from 'agenda';
import { CronModule } from '@modules/cron';
import { DummyQueue } from './dummy.queue';

@Module({
  imports: [
    CronModule.registerQueue('dummy', {
      autoStart: false,
    }),
  ],
  providers: [DummyQueue],
})
export class DummyModule implements OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationBootstrap() {
    const queue = this.moduleRef.get<Agenda>('dummy-queue', { strict: false });
    await queue.start();
  }
}
