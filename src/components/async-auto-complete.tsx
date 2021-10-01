import {
  ServiceLifecycle,
  ServiceMappers,
  useService,
  UseServiceConfig,
} from "../hooks/use-service";

import { useKonamiCode } from "../hooks/use-konami-code";

import { ConnectivityStatus } from "./connectivity-status";
import { AutoComplete, AutoCompleteProps } from "./auto-complete";
import { KONAMI_SEQUENCE } from "../constants/keys";
export interface AsyncAutoCompleteProps<T>
  extends Omit<AutoCompleteProps, "options">,
    Omit<UseServiceConfig<T>, "lifecycle" | "mappers">,
    ServiceMappers<T>,
    ServiceLifecycle<T> {
  service: () => Promise<T>;
}

export function AsyncAutoComplete<T>({
  service,
  execution,
  onMapToOptions,
  onLoading,
  onSuccess,
  onFailure,
  ...rest
}: AsyncAutoCompleteProps<T>) {
  const { connectivityState, options, execute } = useService(service, {
    execution,
    mappers: {
      onMapToOptions,
    },
    lifecycle: {
      onLoading,
      onSuccess,
      onFailure,
    },
  });

  useKonamiCode(execute, { sequence: KONAMI_SEQUENCE });

  return (
    <AutoComplete
      LeftComponent={() => (
        <ConnectivityStatus connectivityState={connectivityState} />
      )}
      options={options}
      {...rest}
    />
  );
}
