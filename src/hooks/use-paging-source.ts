import { useState, useCallback } from "react";

import {
  PagingSourceConfig,
  PagingSourceService,
  PagingSourceState,
  ServicePagingSource,
} from "../@types/service";

export function usePagingSource<T, K>(
  pagingSourceService: PagingSourceService<T, K>,
  config?: PagingSourceConfig<T>
): Omit<ServicePagingSource<T, K>, "config"> {
  const [pagingSourceState, pagingSourceStateSet] = useState<
    PagingSourceState<T>
  >({});

  const service = useCallback(async () => {
    const { state, data } = await pagingSourceService(
      pagingSourceState,
      config
    );
    pagingSourceStateSet(state);
    return data;
  }, [pagingSourceService, pagingSourceState]);

  return {
    service,
    state: pagingSourceState,
  };
}
