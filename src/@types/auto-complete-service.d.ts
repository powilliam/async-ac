import { ConnectivityState } from "./connectivity";
import { Option } from "./option";

export interface ServiceMappers<T> {
  onMapToOptions(value: T): Option<any>[];
}

export interface ServiceLifecycle<T> {
  onLoading?(): void;
  onSuccess?(response: T): void;
  onFailure?<T extends Error>(reason: T): void;
}

export interface ServiceBehaviors {
  paginated?: boolean;
}

export interface ServiceConfig<T> {
  mappers: ServiceMappers<T>;
  lifecycle?: ServiceLifecycle<T>;
  behaviors?: ServiceBehaviors;
}

export interface UseAutoCompleteService<T> {
  connectivityState: ConnectivityState;
  options: Option<T>[];
  execute(): Promise<void>;
}
