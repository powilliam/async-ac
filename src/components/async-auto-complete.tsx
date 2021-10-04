import {
  ServiceBehaviors,
  ServiceLifecycle,
  ServiceMappers,
  useService,
  UseServiceConfig,
} from "../hooks/use-service";
import { useKonamiCode } from "../hooks/use-konami-code";
import { usePagingSource } from "../hooks/use-paging-source";
import { useOnScroll } from "../hooks/use-on-scroll";

import { KONAMI_SEQUENCE } from "../constants/keys";

import { PagingSourceService } from "../@types/paging-source";

import { ConnectivityStatus } from "./connectivity-status";
import { AutoComplete, AutoCompleteProps } from "./auto-complete";

export interface AsyncAutoCompleteProps<T, K>
  extends Omit<AutoCompleteProps, "options">,
    Omit<UseServiceConfig<T>, "lifecycle" | "mappers" | "behaviors">,
    ServiceMappers<T>,
    ServiceLifecycle<T>,
    ServiceBehaviors {
  service: PagingSourceService<K, T>;
}

export function AsyncAutoComplete<T, K>({
  service: propsService,
  paginated: propsPaginated = true,
  onMapToOptions,
  onLoading,
  onSuccess,
  onFailure,
  ...rest
}: AsyncAutoCompleteProps<T, K>) {
  const { state, service } = usePagingSource(propsService);

  const { connectivityState, options, execute } = useService(service, {
    mappers: {
      onMapToOptions,
    },
    lifecycle: {
      onLoading,
      onSuccess,
      onFailure,
    },
    behaviors: {
      paginated: propsPaginated,
    },
  });

  const onScroll = useOnScroll(
    async () => !state.hasReachedTheEnd && (await execute())
  );

  useKonamiCode(async () => !state.hasReachedTheEnd && (await execute()), {
    sequence: KONAMI_SEQUENCE,
  });

  return (
    <AutoComplete
      LeftComponent={() => (
        <ConnectivityStatus connectivityState={connectivityState} />
      )}
      options={options}
      onScroll={onScroll}
      {...rest}
    />
  );
}
