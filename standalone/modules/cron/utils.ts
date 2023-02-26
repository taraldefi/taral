export const getQueueToken = (name?: string) =>
  name ? `${name}-queue` : `cron-queue`;

export const getQueueConfigToken = (name: string): string =>
  `CronQueueOptions_${name}`;
