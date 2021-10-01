import { useState, useEffect, useCallback } from "react";

import { Option } from "../@types/option";
import { ConnectivityState } from "../@types/connectivity";

export type ExecutionMode = "ON_MOUNT" | "WHEN_CALLED";

export interface UseServiceConfig<T> {
  execution?: ExecutionMode;
  toOptions(response: T): Option<any>[];
  onFailure?<T extends Error>(reason: T): void;
}

export interface UseService<T> {
  connectivityState: ConnectivityState;
  options: Option<T>[];
  execute(): Promise<void>;
}

export function useService<T>(
  executor: () => Promise<T>,
  { execution = "ON_MOUNT", toOptions, onFailure }: UseServiceConfig<T>
): UseService<T> {
  const [connectivityState, connectivityStateSet] =
    useState<ConnectivityState>("IDLE");
  const [options, optionsSet] = useState<Option<any>[]>([]);

  const execute = useCallback(async () => {
    connectivityStateSet("LOADING");
    try {
      const response = await executor();
      const asOptions = toOptions(response);
      optionsSet(asOptions);
    } catch (error) {
      connectivityStateSet("FAILURE");
      onFailure && onFailure(error as Error);
    } finally {
      connectivityStateSet("IDLE");
    }
  }, [executor, toOptions]);

  useEffect(() => {
    execution === "ON_MOUNT" && execute();
  }, []);

  return {
    connectivityState,
    options,
    execute,
  };
}
