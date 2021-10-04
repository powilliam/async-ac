import { useRef, useCallback } from "react";

import {
  PagingSourceService,
  PagingSourceState,
  ServicePagingSource,
} from "../@types/paging-source";

const initialPagingSourceState = {
  hasReachedTheEnd: false,
};

export function usePagingSource<T, K>(
  pagingSourceService: PagingSourceService<T, K>
): ServicePagingSource<T, K> {
  const pagingSourceState = useRef<PagingSourceState<T>>(
    initialPagingSourceState
  );

  const service = useCallback(async () => {
    const { state, data } = await pagingSourceService(
      pagingSourceState.current
    );
    pagingSourceState.current = state;
    return data;
  }, [pagingSourceService, pagingSourceState]);

  return {
    state: pagingSourceState.current,
    service,
  };
}
