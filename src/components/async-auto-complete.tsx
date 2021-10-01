import {
  ServiceLifecycle,
  ServiceMappers,
  useService,
  UseServiceConfig,
} from "../hooks/use-service";

import { AutoComplete, AutoCompleteProps } from "./auto-complete";

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
  const { connectivityState, options } = useService(service, {
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

  return (
    <AutoComplete
      connectivityState={connectivityState}
      options={options}
      {...rest}
    />
  );
}
