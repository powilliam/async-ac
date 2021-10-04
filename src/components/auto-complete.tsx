import {
  useRef,
  RefObject,
  forwardRef,
  ForwardedRef,
  FunctionComponent,
} from "react";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  BoxProps,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";

import {
  AutoCompleteState,
  useAutoCompleteState,
} from "../hooks/use-autocomplete-state";

import { Option } from "../@types/option";

import { SMALL_ICON_SIZE } from "../constants/icon";

import { Menu } from "./menu";

export type PositionalComponent = FunctionComponent<Partial<AutoCompleteState>>;

export interface AutoCompleteProps
  extends BoxProps,
    Partial<Omit<AutoCompleteState, "onResetState">> {
  options: Option<any>[];
  LeftComponent?: PositionalComponent;
  RightComponent?: PositionalComponent;
}

function AutoCompleteComponent(
  {
    LeftComponent,
    RightComponent,
    options,
    value,
    selected,
    isMenuOpen,
    onInputFocus,
    onChangeValue,
    onSelectOption,
    onScroll,
    ...rest
  }: AutoCompleteProps,
  inputRef: ForwardedRef<HTMLInputElement>
) {
  const menuRef = useRef() as RefObject<HTMLDivElement>;

  const state = useAutoCompleteState({
    ref: menuRef,
    value,
    selected,
    isMenuOpen,
    onInputFocus,
    onChangeValue,
    onSelectOption,
  });

  return (
    <Box position="relative" {...rest}>
      <InputGroup>
        <InputLeftElement>
          {LeftComponent && <LeftComponent {...state} />}
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={state.value}
          onChange={(e) => state.onChangeValue(e.target.value)}
          onFocus={state.onInputFocus}
        />
        <InputRightElement>
          {RightComponent ? (
            <RightComponent {...state} />
          ) : !state.value ? (
            <ChevronDownIcon {...SMALL_ICON_SIZE} />
          ) : (
            <CloseIcon
              {...SMALL_ICON_SIZE}
              cursor="pointer"
              onClick={state.onResetState}
            />
          )}
        </InputRightElement>
      </InputGroup>
      <Menu
        ref={menuRef}
        selected={state.selected}
        options={options}
        isOpen={state.isMenuOpen}
        onSelectOption={state.onSelectOption}
        onScroll={onScroll}
      />
    </Box>
  );
}

export const AutoComplete = forwardRef(AutoCompleteComponent);
