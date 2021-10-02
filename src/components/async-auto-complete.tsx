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
import { usePagingSource } from "../hooks/use-paging-source";
import { PagingSourceService } from "../@types/service";

export interface AsyncAutoCompleteProps<T, K>
  extends Omit<AutoCompleteProps, "options">,
    Omit<UseServiceConfig<T>, "lifecycle" | "mappers">,
    ServiceMappers<T>,
    ServiceLifecycle<T> {
  service: PagingSourceService<K, T>;
}

export function AsyncAutoComplete<T, K>({
  service,
  onMapToOptions,
  onLoading,
  onSuccess,
  onFailure,
  ...rest
}: AsyncAutoCompleteProps<T, K>) {
  const pagingSource = usePagingSource(service);

  const { connectivityState, options, execute } = useService(
    pagingSource.service,
    {
      mappers: {
        onMapToOptions,
      },
      lifecycle: {
        onLoading,
        onSuccess,
        onFailure,
      },
    }
  );

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
