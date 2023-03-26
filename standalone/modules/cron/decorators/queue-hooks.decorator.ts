import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ON_QUEUE_EVENT, JOB_NAME } from "../constants";
import { CronQueueEvent } from "../enums";

export const OnQueueEvent = (
  type: CronQueueEvent,
  jobName?: string
): MethodDecorator =>
  applyDecorators(
    SetMetadata(ON_QUEUE_EVENT, type),
    SetMetadata(JOB_NAME, jobName)
  );

export const OnQueueReady = () => OnQueueEvent(CronQueueEvent.READY);

export const OnQueueError = () => OnQueueEvent(CronQueueEvent.ERROR);

export const OnJobStart = (jobName?: string) =>
  OnQueueEvent(CronQueueEvent.START, jobName);

export const OnJobComplete = (jobName?: string) =>
  OnQueueEvent(CronQueueEvent.COMPLETE, jobName);

export const OnJobSuccess = (jobName?: string) =>
  OnQueueEvent(CronQueueEvent.SUCCESS, jobName);

export const OnJobFail = (jobName?: string) =>
  OnQueueEvent(CronQueueEvent.FAIL, jobName);
