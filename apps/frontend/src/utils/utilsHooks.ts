type HookFunction = (...params: any[]) => any;

interface HookQueue {
  [key: string]: HookFunction[];
}

class Hooks {
  // current hook queue
  private queue: HookQueue = {};

  add(name: string, fn: HookFunction): void {
    if (!this.queue[name]) {
      this.queue[name] = [];
    }
    this.queue[name].push(fn);
  }

  remove(name: string): void {
    delete this.queue[name];
  }

  call(name: string, ...params: any[]): void {
    if (Array.isArray(this.queue[name])) {
      this.queue[name].forEach((fn) => {
        fn.call(this, ...params);
      });
    }
  }

  return(name: string, ...params: any[]): any {
    if (typeof this.queue[name][0] !== "function") {
      return this.queue[name][0];
    } else {
      return this.queue[name][0](...params);
    }
  }
}

export default Hooks;
