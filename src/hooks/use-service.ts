import { useState, useEffect, useCallback } from "react";

import { Option } from "../@types/option";
import { ConnectivityState } from "../@types/connectivity";

export type ExecutionMode = "ON_MOUNT" | "WHEN_CALLED";

export interface ServiceMappers<T> {
  onMapToOptions(value: T): Option<any>[];
}

export interface ServiceLifecycle<T> {
  onLoading?(): void;
  onSuccess?(response: T): void;
  onFailure?<T extends Error>(reason: T): void;
}

export interface UseServiceConfig<T> {
  execution?: ExecutionMode;
  mappers: ServiceMappers<T>;
  lifecycle: ServiceLifecycle<T>;
}

export interface UseService<T> {
  connectivityState: ConnectivityState;
  options: Option<T>[];
  execute(): Promise<void>;
}

export function useService<T>(
  executor: () => Promise<T>,
  {
    execution = "ON_MOUNT",
    mappers: { onMapToOptions },
    lifecycle: { onLoading, onSuccess, onFailure },
  }: UseServiceConfig<T>
): UseService<T> {
  const [connectivityState, connectivityStateSet] =
    useState<ConnectivityState>("IDLE");
  const [options, optionsSet] = useState<Option<any>[]>([]);

  const execute = useCallback(async () => {
    connectivityStateSet("LOADING");
    onLoading && onLoading();
    try {
      const response = await executor();
      const options = onMapToOptions(response);
      optionsSet(options);
      connectivityStateSet("SUCCESSFUL");
      onSuccess && onSuccess(response);
    } catch (error) {
      connectivityStateSet("FAILURE");
      onFailure && onFailure(error as Error);
    }
  }, [executor, onMapToOptions, onLoading, onSuccess, onFailure]);

  useEffect(() => {
    execution === "ON_MOUNT" && execute();
  }, []);

  return {
    connectivityState,
    options,
    execute,
  };
}
