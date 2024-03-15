import * as v8 from 'v8';

import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';

import { HEALTH_URL } from './health.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller({
  path: HEALTH_URL,
  version: '1',
})
export class HealthController {
  private readonly maxHeapSize: number;
  constructor(private health: HealthCheckService, private memory: MemoryHealthIndicator) {
    this.maxHeapSize = v8.getHeapStatistics().heap_size_limit;
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([async () => this.memory.checkHeap('memoryHeap', this.maxHeapSize)]);
  }
}
