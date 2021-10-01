import { useService, UseServiceConfig } from "../hooks/use-service";

import { AutoComplete, AutoCompleteProps } from "./auto-complete";

export interface AsyncAutoCompleteProps<T>
  extends Omit<AutoCompleteProps, "options">,
    UseServiceConfig<T> {
  service: () => Promise<T>;
}

export function AsyncAutoComplete<T>({
  service,
  execution,
  toOptions,
  onFailure,
  ...rest
}: AsyncAutoCompleteProps<T>) {
  const { connectivityState, options } = useService(service, {
    execution,
    toOptions,
    onFailure,
  });

  return (
    <AutoComplete
      connectivityState={connectivityState}
      options={options}
      {...rest}
    />
  );
}
