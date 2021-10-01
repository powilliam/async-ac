import {
  RefObject,
  useState,
  useCallback,
  ChangeEvent,
  FocusEventHandler,
} from "react";
import { useOutsideClick } from "@chakra-ui/react";

import { Option } from "../@types/option";

export type OnChangeEvent = ChangeEvent<HTMLInputElement>;

export interface UseAutoCompleteStateConfig<T extends RefObject<HTMLElement>> {
  ref: T;
}

export interface AutoCompleteState {
  value: string;
  isMenuOpen: boolean;
  selected?: Option<any>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onChange(event: OnChangeEvent): void;
  onSelectOption(option: Option<any>): void;
  reset(): void;
}

export function useAutoCompleteState<T extends RefObject<HTMLElement>>({
  ref,
}: UseAutoCompleteStateConfig<T>): AutoCompleteState {
  const [value, valueSet] = useState<string>("");
  const [selected, selectedSet] = useState<Option<any> | undefined>();
  const [isMenuOpen, isMenuOpenSet] = useState<boolean>(false);

  const onFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (e) => !isMenuOpen && isMenuOpenSet(true),
    [isMenuOpen]
  );

  const onChange = useCallback(
    (e: OnChangeEvent) => {
      valueSet(e.target.value);
      !isMenuOpen && isMenuOpenSet(true);
    },
    [isMenuOpen]
  );

  const onSelectOption = useCallback(
    (option: Option<any>) => {
      selectedSet(option);
      valueSet(option.value);
      isMenuOpen && isMenuOpenSet(false);
    },
    [isMenuOpen]
  );

  const reset = useCallback(() => {
    valueSet("");
    selectedSet(undefined);
  }, []);

  useOutsideClick({
    ref,
    handler: () => isMenuOpenSet(false),
    enabled: isMenuOpen,
  });

  return {
    value,
    isMenuOpen,
    selected,
    onFocus,
    onChange,
    onSelectOption,
    reset,
  };
}
