import { DependencyList, useMemo } from "react";
import { debounce } from "@utils/lib/performance";

export default function useDebounce<Args extends unknown[]>(
  cb: (...args: Args) => void,
  delay: number,
  deps: DependencyList
) {
  return useMemo(() => debounce(cb, delay), deps);
}
