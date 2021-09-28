export function stopwatch(): {
  /** Milliseconds since stopwatch was created. */
  getElapsed: () => number;
} {
  const start = process.hrtime();
  return {
    getElapsed: () => {
      const hrend = process.hrtime(start);
      return hrend[0] * 1000 + hrend[1] / 1000000;
    },
  };
}

export async function time<T>(
  fn: () => Promise<T>,
  onFinish: (elapsedMs: number) => void
): Promise<T> {
  const watch = stopwatch();
  try {
    return await fn();
  } finally {
    onFinish(watch.getElapsed());
  }
}
