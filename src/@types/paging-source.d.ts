export interface PagingSourceResult<T, K> {
  state: PagingSourceState<T>;
  data: K;
}

export interface PagingSourceState<T> {
  nextKey?: T;
  previousKey?: T;
  hasReachedTheEnd?: boolean;
}

export type PagingSourceService<T, K> = (
  previousState: PagingSourceState<T>
) => Promise<PagingSourceResult<T, K>>;

export interface ServicePagingSource<T, K> {
  state: PagingSourceState<T>;
  service: () => Promise<K>;
}
