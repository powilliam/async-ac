import { UIEvent as InterfaceEvent, useRef, useMemo, useCallback } from "react";

export type OnScrollFn<T, K extends HTMLElement> = (
  event: InterfaceEvent<K, UIEvent>
) => T;

export function useOnScroll<T, K extends HTMLElement>(
  fn: () => T | Promise<T>
): OnScrollFn<ReturnType<typeof fn>, K> {
  const isCalling = useRef(false);

  const hasReachedTheEnd = useCallback(
    (event: InterfaceEvent<K, UIEvent>) =>
      event.currentTarget.scrollHeight -
        Math.abs(event.currentTarget.scrollTop) ===
      event.currentTarget.clientHeight,
    []
  );

  const call = useCallback(async () => {
    try {
      isCalling.current = true;
      return await fn();
    } catch (error) {
      return {} as T;
    } finally {
      isCalling.current = false;
    }
  }, [isCalling, fn]);

  return useCallback(
    async (event) => {
      return !isCalling.current && hasReachedTheEnd(event)
        ? await call()
        : ({} as T);
    },
    [isCalling, hasReachedTheEnd, call]
  );
}
