import Agenda from 'agenda';
import { Every, InjectQueue, Queue } from '@modules/cron';

@Queue('dummy')
export class DummyQueue {
  constructor(@InjectQueue('dummy') queue: Agenda) {
    queue.on('complete:doProcess', () => {
      console.log('Processed dummy queue');
    });
  }

  @Every('1 minute')
  doProcess() {
    console.log('Processing dummy queue');
  }
}
