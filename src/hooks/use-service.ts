import { useState, useEffect, useCallback } from "react";

import { Option } from "../@types/option";
import { ConnectivityState } from "../@types/connectivity";

export interface ServiceMappers<T> {
  onMapToOptions(value: T): Option<any>[];
}

export interface ServiceLifecycle<T> {
  onLoading?(): void;
  onSuccess?(response: T): void;
  onFailure?<T extends Error>(reason: T): void;
}

export interface ServiceBehaviors {
  paginated?: boolean;
}

export interface UseServiceConfig<T> {
  mappers: ServiceMappers<T>;
  lifecycle: ServiceLifecycle<T>;
  behaviors: ServiceBehaviors;
}

export interface UseService<T> {
  connectivityState: ConnectivityState;
  options: Option<T>[];
  execute(): Promise<void>;
}

export function useService<T>(
  executor: () => Promise<T>,
  {
    mappers: { onMapToOptions },
    lifecycle: { onLoading, onSuccess, onFailure },
    behaviors: { paginated },
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
      optionsSet((previous) => [...(paginated ? previous : []), ...options]);
      connectivityStateSet("SUCCESSFUL");
      onSuccess && onSuccess(response);
    } catch (error) {
      connectivityStateSet("FAILURE");
      onFailure && onFailure(error as Error);
    }
  }, [executor, onMapToOptions, onLoading, onSuccess, onFailure]);

  useEffect(() => {
    execute();
  }, []);

  return {
    connectivityState,
    options,
    execute,
  };
}
