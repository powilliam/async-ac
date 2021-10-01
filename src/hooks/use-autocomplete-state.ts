import { RefObject, useState, useCallback, ChangeEvent } from "react";
import { useOutsideClick } from "@chakra-ui/react";

import { Option } from "../@types/option";

export type OnChangeEvent = ChangeEvent<HTMLInputElement>;

export interface UseAutoCompleteStateConfig<T extends RefObject<HTMLElement>> {
  ref: T;
}

export interface AutoCompleteState {
  value: string;
  isMenuOpen: boolean;
  selected?: Option<number, string>;
  onChange(event: OnChangeEvent): void;
  onSelectOption(option: Option<number, string>): void;
  reset(): void;
}

export function useAutoCompleteState<T extends RefObject<HTMLElement>>({
  ref,
}: UseAutoCompleteStateConfig<T>): AutoCompleteState {
  const [value, valueSet] = useState<string>("");
  const [selected, selectedSet] = useState<
    Option<number, string> | undefined
  >();
  const [isMenuOpen, isMenuOpenSet] = useState<boolean>(false);

  const onChange = useCallback(
    (e: OnChangeEvent) => {
      valueSet(e.target.value);
      !isMenuOpen && isMenuOpenSet(true);
    },
    [isMenuOpen]
  );

  const onSelectOption = useCallback((option: Option<number, string>) => {
    selectedSet(option);
    valueSet(option.value);
  }, []);

  const reset = useCallback(() => {
    valueSet("");
    selectedSet(undefined);
  }, []);

  useOutsideClick({
    ref,
    handler: () => isMenuOpenSet(false),
  });

  return {
    value,
    isMenuOpen,
    selected,
    onChange,
    onSelectOption,
    reset,
  };
}
