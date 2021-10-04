import { forwardRef, ForwardedRef } from "react";

import { useAutoCompleteService } from "../hooks/use-auto-complete-service";
import { useKonamiCode } from "../hooks/use-konami-code";
import { usePagingSource } from "../hooks/use-paging-source";
import { useOnScroll } from "../hooks/use-on-scroll";

import { KONAMI_SEQUENCE } from "../constants/keys";

import { PagingSourceService } from "../@types/paging-source";
import {
  ServiceBehaviors,
  ServiceConfig,
  ServiceLifecycle,
  ServiceMappers,
} from "../@types/auto-complete-service";

import { ConnectivityStatus } from "./connectivity-status";
import { AutoComplete, AutoCompleteProps } from "./auto-complete";

export interface AsyncAutoCompleteProps<T, K>
  extends Omit<AutoCompleteProps, "options">,
    Omit<ServiceConfig<T>, "lifecycle" | "mappers" | "behaviors">,
    ServiceMappers<T>,
    ServiceLifecycle<T>,
    ServiceBehaviors {
  service: PagingSourceService<K, T>;
}

function AsyncAutoCompleteComponent<T, K>(
  {
    service: propsService,
    paginated: propsPaginated = true,
    onMapToOptions,
    onLoading,
    onSuccess,
    onFailure,
    ...rest
  }: AsyncAutoCompleteProps<T, K>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { state, service } = usePagingSource(propsService);

  const { connectivityState, options, execute } = useAutoCompleteService(
    service,
    {
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
    }
  );

  const onScroll = useOnScroll(
    async () => !state.hasReachedTheEnd && (await execute())
  );

  useKonamiCode(async () => !state.hasReachedTheEnd && (await execute()), {
    sequence: KONAMI_SEQUENCE,
  });

  return (
    <AutoComplete
      ref={ref}
      LeftComponent={() => (
        <ConnectivityStatus connectivityState={connectivityState} />
      )}
      options={options}
      onScroll={onScroll}
      {...rest}
    />
  );
}

export const AsyncAutoComplete = forwardRef(AsyncAutoCompleteComponent);
