/**
 * The debounce function returns a new function. When it's executed, it creates a timer to execute the original function after the delay and cancels the previous timer.
 * @param fn accepts a function
 * @param delay time in ms
 */

function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
) {
  let timeoutID: number | undefined;
  let lastArgs: Args | undefined;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const debounced = (...args: Args) => {
    clearTimeout(timeoutID);
    lastArgs = args;
    timeoutID = window.setTimeout(run, delay);
  };

  debounced.flush = () => {
    clearTimeout(timeoutID);
    run();
  };

  return debounced;
}

/**
 * The throttle function returns a new function, which when executed, stores the call arguments and starts the cooldown timer.
 * When the timer finishes, execute the action with the cached arguments and clear them.
 * @param fn
 * @param cooldown time in ms
 */

function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  cooldown: number
) {
  let lastArgs: Args | undefined;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const throttled = (...args: Args) => {
    const isOnCooldown = !!lastArgs;

    lastArgs = args;

    if (isOnCooldown) {
      return;
    }

    window.setTimeout(run, cooldown);
  };

  return throttled;
}

export { debounce, throttle };
