export interface PagingSourceResult<T, K> {
  state: PagingSourceState<T>;
  data: K;
}

export interface PagingSourceState<T> {
  nextKey?: T;
  previousKey?: T;
}

export interface PagingSourceConfig<T> {
  offset?: number;
}

export type PagingSourceService<T, K> = (
  previousState: PagingSourceState<T>,
  config?: PagingSourceConfig<T>
) => Promise<PagingSourceResult<T, K>>;

export interface ServicePagingSource<T, K> {
  state: PagingSourceState<T>;
  config: PagingSourceConfig<T>;
  service: () => Promise<K>;
}
