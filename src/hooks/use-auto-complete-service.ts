import { useState, useEffect, useCallback } from "react";

import { Option } from "../@types/option";
import { ConnectivityState } from "../@types/connectivity";
import {
  ServiceConfig,
  UseAutoCompleteService,
} from "../@types/auto-complete-service";

export function useAutoCompleteService<T>(
  executor: () => Promise<T>,
  { mappers: { onMapToOptions }, lifecycle, behaviors }: ServiceConfig<T>
): UseAutoCompleteService<T> {
  const [connectivityState, connectivityStateSet] =
    useState<ConnectivityState>("IDLE");
  const [options, optionsSet] = useState<Option<any>[]>([]);

  const execute = useCallback(async () => {
    connectivityStateSet("LOADING");
    lifecycle?.onLoading && lifecycle?.onLoading();
    try {
      const response = await executor();
      const options = onMapToOptions(response);
      optionsSet((previous) => [
        ...(behaviors?.paginated ? previous : []),
        ...options,
      ]);
      connectivityStateSet("SUCCESSFUL");
      lifecycle?.onSuccess && lifecycle?.onSuccess(response);
    } catch (error) {
      connectivityStateSet("FAILURE");
      lifecycle?.onFailure && lifecycle?.onFailure(error as Error);
    }
  }, [executor, onMapToOptions, lifecycle, behaviors]);

  useEffect(() => {
    execute();
  }, []);

  return {
    connectivityState,
    options,
    execute,
  };
}
