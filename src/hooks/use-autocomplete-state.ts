import {
  RefObject,
  useState,
  useCallback,
  ChangeEvent,
  FocusEventHandler,
} from "react";
import { useOutsideClick } from "@chakra-ui/react";

import { Option } from "../@types/option";

export interface UseAutoCompleteStateConfig<T extends RefObject<HTMLElement>>
  extends Partial<Omit<AutoCompleteState, "onResetState">> {
  ref: T;
}

export interface AutoCompleteState {
  value: string;
  isMenuOpen: boolean;
  selected?: Option<any>;
  onInputFocus: FocusEventHandler<HTMLInputElement>;
  onChangeValue: (value: string) => void;
  onSelectOption(option: Option<any>): void;
  onResetState(): void;
}

export function useAutoCompleteState<T extends RefObject<HTMLElement>>({
  ref,
  value: propsValue,
  isMenuOpen: propsIsMenuOpen,
  selected: propsSelected,
  onInputFocus: propsOnFocus,
  onChangeValue: propsOnChange,
  onSelectOption: propsOnSelectOption,
}: UseAutoCompleteStateConfig<T>): AutoCompleteState {
  const [value, valueSet] = useState<string>("");
  const [selected, selectedSet] = useState<Option<any> | undefined>();
  const [isMenuOpen, isMenuOpenSet] = useState<boolean>(false);

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (e) => {
      !!propsOnFocus && propsOnFocus(e);
      !isMenuOpen && isMenuOpenSet(true);
    },
    [isMenuOpen, propsOnFocus]
  );

  const onChangeValue = useCallback(
    (value) => {
      !!propsOnChange ? propsOnChange(value) : valueSet(value);
      !isMenuOpen && isMenuOpenSet(true);
    },
    [isMenuOpen, propsOnChange]
  );

  const onSelectOption = useCallback(
    (option: Option<any>) => {
      !!propsOnSelectOption ? propsOnSelectOption(option) : selectedSet(option);
      !!propsOnChange ? propsOnChange(option.value) : valueSet(option.value);
      isMenuOpen && isMenuOpenSet(false);
    },
    [isMenuOpen, propsOnSelectOption, propsOnChange]
  );

  const onResetState = useCallback(() => {
    valueSet("");
    selectedSet(undefined);
    isMenuOpen && isMenuOpenSet(false);
  }, [isMenuOpenSet]);

  useOutsideClick({
    ref,
    handler: () => isMenuOpenSet(false),
    enabled: isMenuOpen,
  });

  return {
    value: propsValue ?? value,
    isMenuOpen: propsIsMenuOpen ?? isMenuOpen,
    selected: propsSelected ?? selected,
    onInputFocus,
    onChangeValue,
    onSelectOption,
    onResetState,
  };
}
