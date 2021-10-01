import { useEffect } from "react";

export interface UseDebounceConfig {
  timeout: number;
}

export function useDebounce<T>(fn: () => T, { timeout }: UseDebounceConfig) {
  useEffect(() => {
    const t = setTimeout(fn, timeout);
    return () => clearTimeout(t);
  }, [fn, timeout]);
}
