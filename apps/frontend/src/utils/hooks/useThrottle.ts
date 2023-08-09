import { throttle } from "@utils/lib/performance";
import { DependencyList, useMemo } from "react";

export default function useThrottle<Args extends unknown[]>(
  cb: (...args: Args) => void,
  cooldown: number,
  deps: DependencyList
) {
  return useMemo(() => throttle(cb, cooldown), deps);
}
